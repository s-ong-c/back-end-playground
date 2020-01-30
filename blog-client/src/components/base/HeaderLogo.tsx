import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Logo } from '../../static/svg';
import { UserLogo } from '../../modules/header';
import palette from '../../lib/styles/palette';

const createFallbackTitle = (username: string | null) => {
  if (!username) return null;
  const lastChar = username.slice(-1).toLowerCase();
  if (lastChar === 's') {
    return `${username}' Story`;
  }
  return `${username}'s Story`;
};

const HeaderLogoBlock = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${palette.gray8};
  font-size: 1.3125rem;
  text-decoration: none;
`;

export interface HeaderLogoProps {
  custom: boolean;
  userLogo: UserLogo | null;
  songcUsername: string | null;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({
  custom,
  userLogo,
  songcUsername,
}) => {
  if (!custom) {
    return (
      <HeaderLogoBlock to="/">
        <Logo data-testid="songc-logo" />
      </HeaderLogoBlock>
    );
  }
  console.log(userLogo, songcUsername);
  if (!userLogo) return null;
  if (!songcUsername) return null;
  const songcPath = `/@${songcUsername}`;
  return (
    <HeaderLogoBlock to={songcPath}>
      {userLogo.title || createFallbackTitle(songcUsername)}
    </HeaderLogoBlock>
  );
};

export default HeaderLogo;
