import * as React from 'react';
import styled, { css } from 'styled-components';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdInsertLink,
  MdFormatQuote,
  MdImage,
  MdCode,
} from 'react-icons/md';
import palette from '../../lib/styles/palette';

const ToolbarBlock = styled.div<{visible: boolean}>`
  margin-top: 1.5rem;
  top: 0;
  left:0;
  width: 10%;
  height: 2.5rem;
  display: flex;
  width: 100%;
  align-items: center;
  background: white;
  ${props =>
    !props.visible &&
    css`
      visibility: hidden;
    `}
`;

const ToolbarGroup = styled.div`
  display: flex;
`
const Heading = styled.div`
  font-size: 1rem;
  font-weight: bold;
  font-family: serif;
  span {
    font-size: 0.75rem;
  }
`;
const ToolbarItem = styled.button`
  width: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: ${palette.gray6};
  cursor: pointer;
  &:hover {
    color: ${palette.gray9};
    background: ${palette.gray0};
  }
  background: none;
  outline: none;
  border: none;
  padding: 0;
  &.ql-active {
    color: ${palette.teal6};
  }
`;


const Separator = styled.div`
    width: 1px;
    height: 1.25rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    background: ${palette.gray4};
`;

interface ToolbarProps{
  visible: boolean;
}

const Toolbar: React.SFC<ToolbarProps> = ({ visible }) => {
  return (
<ToolbarBlock visible={visible} id="toolbar">
      <ToolbarGroup>
        <ToolbarItem className="ql-header" value={1}>
          <Heading>
            H<span>1</span>
          </Heading>
        </ToolbarItem>
        <ToolbarItem className="ql-header" value={2}>
          <Heading>
            H<span>2</span>
          </Heading>
        </ToolbarItem>
        <ToolbarItem className="ql-header" value={3}>
          <Heading>
            H<span>3</span>
          </Heading>
        </ToolbarItem>
        <ToolbarItem className="ql-header" value={4}>
          <Heading>
            H<span>4</span>
          </Heading>
        </ToolbarItem>
      </ToolbarGroup>
      <Separator />
      <ToolbarGroup>
        <ToolbarItem className="ql-bold">
          <MdFormatBold />
        </ToolbarItem>
        <ToolbarItem className="ql-italic">
          <MdFormatItalic />
        </ToolbarItem>
        <ToolbarItem className="ql-underline">
          <MdFormatUnderlined />
        </ToolbarItem>
        <ToolbarItem className="ql-strike">
          <MdFormatStrikethrough />
        </ToolbarItem>
      </ToolbarGroup>
      <Separator />
      <ToolbarGroup>
        <ToolbarItem className="ql-blockquote">
          <MdFormatQuote />
        </ToolbarItem>
        <ToolbarItem className="ql-link">
          <MdInsertLink />
        </ToolbarItem>
        <ToolbarItem className="ql-image">
          <MdImage />
        </ToolbarItem>
        <ToolbarItem className="ql-code-block">
          <MdCode />
        </ToolbarItem>
      </ToolbarGroup>
    </ToolbarBlock>
  );
};

export default Toolbar;