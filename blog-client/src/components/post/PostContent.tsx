import * as React from 'react';
import styled from 'styled-components';
import MarkdownRender from '../common/MarkdownRender';
import PostHtmlContent from './PostHtmlContent';
import media from '../../lib/styles/media';

const PostContentBlock = styled.div`
  width: 680px;
  margin: 0 auto;
  margin-top: 5rem;
  ${media.medium} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  ${media.small} {
    width: 100%;
  }
`;
export interface PostContentProps {
  isMarkdown: boolean;
  body: string;
}

const PostContent: React.FC<PostContentProps> = ({ isMarkdown, body }) => {
  return (
    <PostContentBlock>
      {isMarkdown ? (
        <MarkdownRender markdown={body} />
      ) : (
        <PostHtmlContent html={body} />
      )}
    </PostContentBlock>
  );
};

export default PostContent;
