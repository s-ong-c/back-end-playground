import * as React from 'react';
import styled from 'styled-components';

const PostCardBlock = styled.div``;
interface PostCardProps{}

const PostCard: React.SFC<PostCardProps> = props => {
  return <PostCardBlock>PostCardBlock</PostCardBlock>;
  };

export default PostCard;