import * as React from 'react';
import styled from 'styled-components';
import { Comment } from '../../lib/graphql/post';
import PostCommentItem from './PostCommentItem';

const PostCommentListBlock = styled.div`
  margin-top: 2.5rem;
`;
export interface PostCommentListProps {
  comments: Comment[];
  currentUserId: null | string;
  onRemove: (id: string) => any;
}

const PostCommentList: React.FC<PostCommentListProps> = ({
  comments,
  currentUserId,
  onRemove,
}) => {
  return (
    <PostCommentListBlock>
      {comments.map(comment => (
        <PostCommentItem
          ownComment={currentUserId === (comment.user && comment.user.id)}
          onRemove={onRemove}
          comment={comment}
          key={comment.id}
        />
      ))}
    </PostCommentListBlock>
  );
};

export default PostCommentList;
