import * as React from 'react';
import styled, { css } from 'styled-components';
import { Logo } from '../../static/svg';
import Button from '../common/Button';
import { breakpoints } from '../../lib/styles/responsive';
import RoundButton from '../common/RoundButton';
import { CurrentUser } from '../../lib/graphql/user';
import HeaderUserIcon from './HeaderUserIcon';

const HeaderBlock = styled.div<{
  floating: boolean;
}>`
  width: 100%;
  .wrapper {
    width: ${breakpoints.xlarge};
    height: 6rem;
    margin: 0rem auto;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logged-in {
      display: flex;
      align-items: center;
    }
  }

  ${props => props.floating && 
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
interface HeaderProps{
  floating: boolean;
  floatingMargin: number;
  onLoginClick: () => void;
  user: CurrentUser | null;
}

const Header: React.SFC<HeaderProps> = ({ 
  floating, 
  floatingMargin, 
  onLoginClick,
  user,
}) => {
  return (
    <>
        <HeaderBlock
          floating={floating}
          style={{marginTop: floating ? floatingMargin : 0 }}
          >
            <div className="wrapper">
              <div className="brand">
                <Logo />
              </div>
              <div className="right">
                { user ? (
                  <div className="logged-in">
                    <RoundButton border color="darkGray" style={{ marginRight:'1.5rem'}}>새 글 작성</RoundButton>
                    <HeaderUserIcon user={user} /> 
                  </div>
                  ):(
                    <RoundButton onClick={onLoginClick} size="DEFAULT">
                      로그인
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