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
  width: 100%;
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
const ToolbarItem = styled.div`
  display: flex;
  width: 2.5rem;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${palette.gray7};
  cursor: pointer;
  &:hover {
    color: ${palette.gray9};
    background: ${palette.gray0};
  }
`;
interface ToolbarProps{
  visible: boolean;
}

const Toolbar: React.SFC<ToolbarProps> = ({ visible }) => {
  return (
    <ToolbarBlock visible={visible} id="toolbar">
      <ToolbarGroup>
        <ToolbarItem>
          <MdFormatBold />
        </ToolbarItem>
        <ToolbarItem>
          <MdFormatItalic />
        </ToolbarItem>
        <ToolbarItem>
          <MdFormatUnderlined />
        </ToolbarItem>
        <ToolbarItem>
          <MdFormatStrikethrough />
        </ToolbarItem>
        <ToolbarItem>
          <MdInsertLink />
        </ToolbarItem>
        <ToolbarItem>
          <MdFormatQuote />
        </ToolbarItem>
        <ToolbarItem>
          <MdImage />
        </ToolbarItem>
        <ToolbarItem>
          <MdCode />
        </ToolbarItem>
      </ToolbarGroup>
    </ToolbarBlock>
  );
};

export default Toolbar;