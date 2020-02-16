import React, { useState } from 'react';
import styled from 'styled-components';
import PostCommentsWrite from '../../components/post/PostCommentsWrite';

const PostCommentsWriteContainerBlock = styled.div``;
export interface PostCommentsWriteContainerProps {}

const PostCommentsWriteContainer: React.FC<PostCommentsWriteContainerProps> = props => {
  const [comment, setComment] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const onWrite = () => {};
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
