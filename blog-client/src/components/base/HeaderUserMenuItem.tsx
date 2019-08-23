import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const HeaderUserMenuItemBlock = styled.div``;
interface HeaderUserMenuItemProps{
    to?: string;
    onClick?: () => void;
}

const HeaderUserMenuItem: React.SFC<HeaderUserMenuItemProps> = ({
    children, 
    to,
    onClick,
}) => {
    const jsx = (
        <HeaderUserMenuItemBlock onClick={onClick}>
            {children}
        </HeaderUserMenuItemBlock>
    );
  return to ?( 
    <Link to={to} style={{ display: 'block'}}>
        {jsx}
    </Link>
    ) : (
    jsx
    );
};

export default HeaderUserMenuItem;