import { ApolloContext } from './../app';
import { gql, IResolvers, ApolloError, AuthenticationError } from 'apollo-server-koa';
import Post from '../entity/Post';
import { getRepository, getManager, getConnectionManager } from 'typeorm';
import PostScore from '../entity/PostScore';
import { normalize } from '../lib/utils';
import removeMd from 'remove-markdown';
import PostsTags from '../entity/PostsTags';
import Tag from '../entity/Tag';

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
    short_description: String
    comments: [Comment]
    tags: [String]
    comments_count: Int
  }
  extend type Query {
    post(id: ID, username: String, url_slug: String): Post
    posts(cursor: ID, limit: Int, username: String): [Post]
    trendingPosts(offset: Int, limit: Int): [Post]
  }
  extend type Mutation {
    writePost(
      title: String
      body: String
      tags: [String]
      is_markdown: Boolean
      is_temp: Boolean
      url_slug: String
      thumbnail: String
      meta: JSON
      is_private: Boolean
    ): Post
  }
`;

type WritePostArgs = {
  title: string;
  body: string;
  tags: string[];
  is_markdown: boolean;
  is_temp: boolean;
  url_slug: string;
  thumbnail: string | null;
  meta: any;
};

export const resolvers: IResolvers<any, ApolloContext> = {
  Post: {
    user: (parent: Post, _: any, { loaders }) => {
      if (!parent.user) {
        return loaders.user.load(parent.fk_user_id);
      }
      // TODO: fetch user if null
      return parent.user;
    },
    short_description: (parent: Post) => {
      if (parent.meta.short_description) {
        return parent.meta.short_description;
      }

      const removed = removeMd(
        parent.body
          .replace(/```([\s\S]*?)```/g, '')
          .replace(/~~~([\s\S]*?)~~~/g, '')
          .slice(0, 500)
      );
      return removed.slice(0, 200) + (removed.length > 200 ? '...' : '');
    },
    comments: (parent: Post, _: any, { loaders }) => {
      if (parent.comments) return parent.comments;
      return loaders.comments.load(parent.id);
    },
    comments_count: async (parent: Post, _: any, { loaders }) => {
      if (parent.comments) return parent.comments.length;
      const comments = await loaders.comments.load(parent.id);
      return comments.length;
    },
    tags: async (parent: Post, _: any, { loaders }) => {
      const tags = await loaders.tags.load(parent.id);
      return tags.map(tag => tag.name);
    }
  },
  Query: {
    post: async (parent: any, { id, username, url_slug }: any, ctx: any) => {
      try {
        if (id) {
          const post = await getManager()
            .createQueryBuilder(Post, 'post')
            .leftJoinAndSelect('post.user', 'user')
            .leftJoinAndSelect('post.comments', 'comment')
            .where('post.id = :id', { id })
            .orderBy({
              'comment.created_at': 'ASC'
            })
            .getOne();

          return post;
        }
        const post = await getManager()
          .createQueryBuilder(Post, 'post')
          .leftJoinAndSelect('post.user', 'user')
          .leftJoinAndSelect('post.comments', 'comment')
          .where('user.username = :username AND url_slug = :url_slug', { username, url_slug })
          .orderBy({
            'comment.created_at': 'ASC'
          })
          .getOne();
        if (!post) {
          console.log('fuck');
          return null;
        }
        if ((post.is_temp || post.is_private === true) && post.fk_user_id !== ctx.user_id) {
          return null;
        }

        return post;
      } catch (e) {
        console.log(e);
      }
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
    },
    trendingPosts: async (parent: any, { offset = 0, limit = 20 }) => {
      const query = getRepository(PostScore)
        .createQueryBuilder()
        .select('fk_post_id')
        .addSelect('SUM(score)', 'score')
        .where('created_at > now()::DATE - 14 AND fk_post_id IS NOT NULL')
        .groupBy('fk_post_id')
        .orderBy('score', 'DESC')
        .addOrderBy('fk_post_id', 'DESC')
        .limit(limit);

      if (offset) {
        query.offset(offset);
      }

      const rows = (await query.getRawMany()) as { fk_post_id: string; score: number }[];
      const ids = rows.map(row => row.fk_post_id);
      const posts = await getRepository(Post).findByIds(ids);
      const normalized = normalize(posts);
      const ordered = ids.map(id => normalized[id]);

      return ordered;
    }
  },
  Mutation: {
    writePost: async (parent: any, args, ctx) => {
      if (!ctx.user_id) {
        throw new AuthenticationError('Not Logged In');
      }
      const post = new Post();
      const data = args as WritePostArgs;
      post.fk_user_id = ctx.user_id;
      post.title = data.title;
      post.body = data.body;
      post.is_temp = data.is_temp;
      post.is_markdown = data.is_markdown;
      post.meta = data.meta;
      post.thumbnail = data.thumbnail;
      post.url_slug = data.url_slug;

      const postRepo = getRepository(Post);
      const tagsData = await Promise.all(data.tags.map(Tag.findOrCreate));
      await postRepo.save(post);
      PostsTags.syncPostTags(post.id, tagsData);

      post.tags = tagsData;
      return post;
    }
  }
};
