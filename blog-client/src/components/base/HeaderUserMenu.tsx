import * as React from 'react';
import styled from 'styled-components';
import OutSideClickHandler from 'react-outside-click-handler';
import HeaderUserMenuItem from './HeaderUserMenuItem';

const HeaderUserMenuBlock = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 1rem;
  > .menu-wrapper {
    width: 12rem;
    background: white;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  }
`;

interface HeaderUserMenuProps {
  onClose: () => void;
  onLogout: () => void;
  username: string;
  visible: boolean;
}

const HeaderUserMenu: React.SFC<HeaderUserMenuProps> = ({
  onClose,
  onLogout,
  username,
  visible,
}) => {
  if (!visible) return null;
  return (
    <OutSideClickHandler onOutsideClick={onClose}>
      <HeaderUserMenuBlock>
        <div className="menu-wrapper">
          <HeaderUserMenuItem>내 블로그</HeaderUserMenuItem>
          <HeaderUserMenuItem to={`/@${username}`}>
            New Story
          </HeaderUserMenuItem>
          <HeaderUserMenuItem to="/saves">임시글</HeaderUserMenuItem>
          <HeaderUserMenuItem to="/setting">Settings </HeaderUserMenuItem>
          <HeaderUserMenuItem onClick={onLogout}>Sign out</HeaderUserMenuItem>
        </div>
      </HeaderUserMenuBlock>
    </OutSideClickHandler>
  );
};

export default HeaderUserMenu;
