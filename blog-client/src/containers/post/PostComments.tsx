import * as React from 'react';
import PostCommentsTemplate from '../../components/post/PostCommentsTemplate';
import PostCommentsWriteContainer from './PostCommentsWriteContainer';
import { Comment } from '../../lib/graphql/post';
import PostCommentList from '../../components/post/PostCommentList';

export interface PostCommentsProps {
  comments: Comment[];
  postId: string;
}

const PostComments: React.FC<PostCommentsProps> = ({ comments, postId }) => {
  return (
    <PostCommentsTemplate count={comments.length}>
      <PostCommentsWriteContainer postId={postId} />
      <PostCommentList comments={comments} />
    </PostCommentsTemplate>
  );
};

export default PostComments;
