import * as React from 'react';
import styled from 'styled-components';
import SongcResponsive from '../songc/SongcResponsive';
import palette from '../../lib/styles/palette';

const PostHeadBlock = styled(SongcResponsive)`
  margin-top: 5.5rem;
  h1 {
    font-size: 3rem;
    line-height: 1.125;
    letter-spacing: -0.02rem;
    margin-top: 0;
    font-weight: 800;
    color: ${palette.gray8};
  }
`;
export interface PostHeadProps {
  title: string;
  tags: string[];
  username: string;
  date: string | number;
}

const PostHead: React.FC<PostHeadProps> = ({ title }) => {
  return (
    <PostHeadBlock>
      <h1>{title}</h1>
    </PostHeadBlock>
  );
};

export default PostHead;
