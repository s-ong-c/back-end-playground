import * as React from 'react';
import styled from 'styled-components';
import SongcResponsive from '../songc/SongcResponsive';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';

const PostHeadBlock = styled(SongcResponsive)`
  margin-top: 5.5rem;
  h1 {
    font-size: 3rem;
    line-height: 1.125;
    letter-spacing: -0.02rem;
    margin-top: 0;
    font-weight: 800;
    color: ${palette.gray8};
    margin-bottom: 2rem;
  }
`;

const SubInfo = styled.div`
  font-size: 1rem;
  color: ${palette.gray8};
  .username {
    color: ${palette.gray9};
    font-weight: bold;
  }
  .separator {
    color: ${palette.gray8};
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;
export interface PostHeadProps {
  title: string;
  tags: string[];
  username: string;
  date: string;
}

const PostHead: React.FC<PostHeadProps> = ({ title, username, date }) => {
  return (
    <PostHeadBlock>
      <h1>{title}</h1>
      <SubInfo>
        <span className="username">{username}</span>
        <span className="separator">&middot;</span>
        <span>{formatDate(date)}</span>
      </SubInfo>
    </PostHeadBlock>
  );
};

export default PostHead;
