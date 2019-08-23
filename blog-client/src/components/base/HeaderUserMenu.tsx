import * as React from 'react';
import styled from 'styled-components';
import HeaderUserMenuItem from './HeaderUserMenuItem';
const HeaderUserMenuBlock = styled.div``;
interface HeaderUserMenuProps{}

const HeaderUserMenu: React.SFC<HeaderUserMenuProps> = props => {
  return( 
      <HeaderUserMenuBlock>
        <HeaderUserMenuItem>내 블로그</HeaderUserMenuItem>
        <HeaderUserMenuItem>New Story</HeaderUserMenuItem>
        <HeaderUserMenuItem>Settings </HeaderUserMenuItem>
        <HeaderUserMenuItem>Sign out</HeaderUserMenuItem>
      </HeaderUserMenuBlock>
    );
  };

export default HeaderUserMenu;