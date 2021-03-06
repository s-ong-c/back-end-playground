import * as React from 'react';
import styled, { css } from 'styled-components';
import { breakpoints } from '../../lib/styles/responsive';
import RoundButton from '../common/RoundButton';
import { CurrentUser } from '../../lib/graphql/user';
import HeaderUserIcon from './HeaderUserIcon';
import useToggle from '../../lib/hooks/useToggle';
import HeaderUserMenu from './HeaderUserMenu';
import { logout } from '../../lib/api/auth';
import storage from '../../lib/storage';
import { UserLogo } from '../../modules/header';
import HeaderLogo from './HeaderLogo';
import media from '../../lib/styles/media';
import { IoMdTime } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
const HeaderBlock = styled.div<{ floating: boolean }>`
  width: 100%;
  > .wrapper {
    width: ${breakpoints.xlarge};
    height: 6rem;
    margin: 0rem auto;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${media.large} {
      width: 1024px;
    }
    ${media.medium} {
      width: 100%;
      .write-button {
        display: none;
      }
      .search {
        display: block;
      }
    }
    ${media.small} {
      height: 3.5rem;

      .login-button {
        font-size: 0.875rem;
        padding-left: 0.75rem;
        padding-right: 0.75rem;
      }
    }
    .logged-in {
      position: relative;
      display: flex;
      align-items: center;
    }
  }

  ${props =>
    props.floating &&
    css`
      position: fixed;
      top: 0;
      background: rgba(255, 255, 255, 0.9);
      box-shadow: 0px 0 8px rgba(0, 0, 0, 0.08);
    `}
`;
const Placeholder = styled.div`
  width: 100%;
  height: 4rem;
`;
interface HeaderProps {
  floating: boolean;
  floatingMargin: number;
  onLoginClick: () => void;
  user: CurrentUser | null;
  isWrite?: boolean;
  custom: boolean;
  userLogo: UserLogo | null;
  songcUsername: string | null;
}

const { useCallback } = React;
const Header: React.FC<HeaderProps> = ({
  floating,
  floatingMargin,
  onLoginClick,
  user,
  custom,
  userLogo,
  songcUsername,
}) => {
  const [userMenu, toggleUserMenu] = useToggle(false);

  const onLogout = useCallback(async () => {
    try {
      await logout();
    } catch {}
    storage.removeItem('CURRENT_USER');
    window.location.href = '/';
  }, []);
  return (
    <>
      <HeaderBlock
        floating={floating}
        style={{ marginTop: floating ? floatingMargin : 0 }}
        data-testid="Header"
      >
        <div className="wrapper">
          <div className="brand">
            <HeaderLogo
              custom={custom}
              userLogo={userLogo}
              songcUsername={songcUsername}
            />
          </div>
          <div className="right">
            {user ? (
              <div className="logged-in">
                <RoundButton
                  border
                  color="darkGray"
                  style={{ marginRight: '1.25rem' }}
                  to="/write"
                >
                  <IoMdTime />
                </RoundButton>
                <RoundButton
                  border
                  color="darkGray"
                  style={{ marginRight: '1.25rem' }}
                  to="/write"
                >
                  <FiEdit />
                </RoundButton>
                <HeaderUserIcon user={user} onClick={toggleUserMenu} />
                <HeaderUserMenu
                  onClose={toggleUserMenu}
                  username={user.username}
                  onLogout={onLogout}
                  visible={userMenu}
                />
              </div>
            ) : (
              <RoundButton
                className="login-button"
                color="blue"
                onClick={onLoginClick}
                size="DEFAULT"
              >
                Get Started
              </RoundButton>
            )}
          </div>
        </div>
      </HeaderBlock>
      {floating && <Placeholder />}
    </>
  );
};

export default Header;
