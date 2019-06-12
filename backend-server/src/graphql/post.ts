import { gql, IResolvers, ApolloError } from "apollo-server-koa";
import { createConnection, getConnection, getManager, getRepository } from 'typeorm';
import { User } from '../entity/User';
import { UserProfile } from '../entity/UserProfile';
import { Post } from '../entity/Post';

export const typeDef = gql`
  type Post {
    id: ID!
    title: String
    body: String
    thumbnail: String
    is_markdown: Boolean
    is_temp: Boolean
    user: User
    url_slug: String
    likes: Int
    meta: JSON
    views: Int
    is_private: Boolean
    released_at: Date
    created_at: Date
    updated_at: Date
  }
  extend type Query {
    post(id: ID, username: String, url_slug: String): Post
    posts(cursor: ID, limit: Int, username: String): [Post]
  }
`;

export const resolvers: IResolvers = {
  Post: {
    user: (parent: Post) => {
      // TODO: fetch user if null
      return parent.user;
    }
  },
  Query: {
    post: async (parent: any, { id, username, url_slug }: any, ctx: any) => {
      try {
        if (id) {
          const post = await getRepository(Post).findOne({
            loadEagerRelations: true,
            where: {
              id
            }
          });
          return post;
        }
        const post = await getManager()
          .createQueryBuilder(Post, 'post')
          .leftJoinAndSelect('post.user', 'user')
          .where('user.username = :username AND url_slug = :url_slug', { username, url_slug })
          .getOne();
        if (!post) return null;
        if ((post.is_temp || post.is_private === true) && post.fk_user_id !== ctx.user_id) {
          return null;
        }
        return post;
      } catch (e) {}
    },
    posts: async (parent: any, { cursor, limit = 20, username }: any, context: any) => {
      const query = getManager()
        .createQueryBuilder(Post, 'post')
        .limit(limit)
        .orderBy('post.released_at', 'DESC')
        .addOrderBy('post.id', 'DESC')
        .leftJoinAndSelect('post.user', 'user')
        .where('post.is_temp = false AND is_private = false');

      if (username) {
        query.andWhere('user.username = :username', { username });
      }

      if (cursor) {
        const post = await getRepository(Post).findOne({
          id: cursor
        });
        if (!post) {
          throw new ApolloError('invalid cursor');
        }
        query.andWhere('post.released_at < :date', {
          date: post.released_at,
          id: post.id
        });
        query.orWhere('post.released_at = :date AND post.id < :id', {
          date: post.released_at,
          id: post.id
        });
      }

      if (context.user_id) {
        query.orWhere('post.is_private = true and post.fk_user_id = :id', {
          id: context.user_id
        });
      }
      const posts = await query.getMany();
      return posts;
    }
  }
};