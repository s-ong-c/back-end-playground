import React, { useState } from 'react';
import styled from 'styled-components';
import PostCommentsWrite from '../../components/post/PostCommentsWrite';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { WRITE_COMMENT, RELOAD_COMMENTS } from '../../lib/graphql/post';

const PostCommentsWriteContainerBlock = styled.div``;
export interface PostCommentsWriteContainerProps {
  postId: string;
  commentId?: string;
}

const PostCommentsWriteContainer: React.FC<PostCommentsWriteContainerProps> = ({
  postId,
}) => {
  const [comment, setComment] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const [writeComment] = useMutation(WRITE_COMMENT);
  const reloadComments = useQuery(RELOAD_COMMENTS, {
    skip: true,
    fetchPolicy: 'network-only',
    variables: {
      id: postId,
    },
  });

  const onWrite = async () => {
    await writeComment({
      variables: {
        post_id: postId,
        text: comment,
      },
    });
    setComment('');
    await reloadComments.refetch();
  };
  return (
    <PostCommentsWriteContainerBlock>
      <PostCommentsWrite
        comment={comment}
        onChange={onChange}
        onWrite={onWrite}
      />
    </PostCommentsWriteContainerBlock>
  );
};

export default PostCommentsWriteContainer;
