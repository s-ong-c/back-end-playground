import { ApolloContext } from './../app';
import { gql, IResolvers, AuthenticationError, ApolloError } from 'apollo-server-koa';
import Comment from '../entity/Comment';
import { getRepository } from 'typeorm';
import Post from '../entity/Post';

export const typeDef = gql`
  type Comment {
    id: ID!
    text: String
    likes: Int
    level: Int
    has_replies: Boolean
    deleted: Boolean
    user: User
    replies: [Comment]
    created_at: Date
  }
  extend type Query {
    subcomments(comment_id: ID): [Comment]
  }

  extend type Mutation {
    writeComment(post_id: ID!, text: String!, comment_id: ID): Comment
  }
`;
type WriteCommentArgs = {
  post_id: string;
  text: string;
  comment_id?: string;
};
export const resolvers: IResolvers<any, ApolloContext> = {
  Comment: {
    text: (parent: Comment) => {
      if (parent.deleted) {
        return null;
      }
      return parent.text;
    },
    user: (parent: Comment, _: any, { loaders }) => {
      if (parent.deleted) return null;
      if (parent.user) return parent.user;
      const user = loaders.user.load(parent.fk_user_id);
      return user;
    }
  },
  Query: {
    subcomments: async (parent: any, { comment_id }) => {
      const comments = await getRepository(Comment).find({
        where: {
          reply_to: comment_id
        },
        order: {
          created_at: 'ASC'
        }
      });
      return comments;
    }
  },
  Mutation: {
    writeComment: async (parent: any, args, ctx) => {
      if (!ctx.user_id) {
        throw new AuthenticationError('Not Logged In');
      }

      const { post_id, comment_id, text } = args as WriteCommentArgs;
      const post = await getRepository(Post).findOne(post_id);
      if (!post) {
        throw new ApolloError('Post not found', 'NOT_FOUND');
      }
      const commentRepo = getRepository(Comment);
      const comment = new Comment();

      if (comment_id) {
        const commentTarget = await commentRepo.findOne(comment_id);
        if (!commentTarget) {
          throw new ApolloError('Target comment is not found', 'NOT_FOUND');
        }
        comment.level = commentTarget.level + 1;
        comment.reply_to = comment_id;

        if (comment.level === 4) {
          throw new ApolloError('Maximum comment level is 3', 'BAD_REQUEST');
        }

        commentTarget.has_replies = true;
        await commentRepo.save(commentTarget);
      }

      comment.fk_user_id = ctx.user_id;
      comment.text = text;
      comment.fk_post_id = post_id;

      await commentRepo.save(comment);
      return comment;
    }
  }
};
