import * as React from 'react';
import styled from 'styled-components';
import { Comment } from '../../lib/graphql/post';
import PostCommentItem from './PostCommentItem';

const PostCommentListBlock = styled.div`
  margin-top: 2.5rem;
`;
export interface PostCommentListProps {
  comments: Comment[];
}

const PostCommentList: React.FC<PostCommentListProps> = ({ comments }) => {
  return (
    <PostCommentListBlock>
      {comments.map(comment => (
        <PostCommentItem comment={comment} key={comment.id} />
      ))}
    </PostCommentListBlock>
  );
};

export default PostCommentList;
