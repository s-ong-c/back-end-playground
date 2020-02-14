import * as React from 'react';
import styled from 'styled-components';
import Typography from '../../components/common/Typography';
import prismThemes from '../../lib/styles/prismThemes';
import media from '../../lib/styles/media';

const PostHtmlContentBlock = styled.div`
  &.atom-one-dark {
    ${prismThemes['atom-one-dark']}
  }
  &.atom-one-light {
    ${prismThemes['atom-one-light']}
  }
  &.github {
    ${prismThemes['github']}
  }
  &.monokai {
    ${prismThemes['monokai']}
  }
  &.dracula {
    ${prismThemes['dracula']}
  }
  &.dracula {
    ${prismThemes['dracula']}
  }
  &.gatsby-highlight-code-line {
    ${prismThemes['gatsby-highlight-code-line']}
  }
  pre {
    font-family: 'Fira Code', 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono',
      monospace;
    font-size: 1rem;
    padding: 1rem;
    font-weight: bold;
    border-radius: 4px;
    line-height: 1.6;
    overflow-x: auto;

    ${media.medium} {
      font-size: 0.75rem;
      line-height: 1.4;
    }

    /*gatsby-highlight-code-line */
    /* background: #212121; */
    background: rgba(235, 236, 237, 0.3);
    span {
      /* color: white; */
    }
  }
  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;
export interface PostHtmlContentProps {
  html: string;
  codeTheme?: string;
}
const PostHtmlContent: React.FC<PostHtmlContentProps> = ({
  html,
  codeTheme = 'dracula',
}) => {
  return (
    <Typography>
      <PostHtmlContentBlock
        className={codeTheme}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Typography>
  );
};

export default PostHtmlContent;
