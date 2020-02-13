import React, { useRef } from 'react';
import { MdTrendingUp, MdAccessTime, MdMoreVert } from 'react-icons/md';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import media from '../../lib/styles/media';
import useToggle from '../../lib/hooks/useToggle';
import MainTopHeadExtra from './MainTopHeadExtra';

export type MainTopHeadProps = {};

function MainTopHead(props: MainTopHeadProps) {
  const [extra, toggle] = useToggle(false);
  const moreButtonRef = useRef<HTMLDivElement | null>(null);

  const onClose = (e: React.MouseEvent<HTMLElement>) => {
    if (!moreButtonRef.current) return;
    if (
      e.target === moreButtonRef.current ||
      moreButtonRef.current.contains(e.target as Node)
    ) {
      return;
    }
    toggle();
  };

  return (
    <Section>
      <div className="menu">
        <MenuItem
          to="/trending"
          activeClassName="active"
          isActive={(match, location) =>
            ['/', '/trending'].includes(location.pathname)
          }
        >
          <MdTrendingUp />
          트렌딩
        </MenuItem>
        <MenuItem to="/recent" activeClassName="active">
          <MdAccessTime />
          최신
        </MenuItem>
        <MenuItem to="/programing" activeClassName="active">
          <MdAccessTime />
          최신
        </MenuItem>
        <MenuItem to="/react" activeClassName="active">
          <MdAccessTime />
          essay
        </MenuItem>
        <MenuItem to="/server" activeClassName="active">
          <MdAccessTime />
          server
        </MenuItem>
      </div>
      <div ref={moreButtonRef}>
        <MdMoreVert className="more" onClick={toggle} />
      </div>
      <MainTopHeadExtra visible={extra} onClose={onClose} />
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1.5rem;
  .menu {
    display: flex;
  }
  .more {
    font-size: 1.5rem;
    color: ${palette.gray6};
  }

  ${media.medium} {
    display: flex;
  }
`;

const MenuItem = styled(NavLink)`
  width: 5rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 600;
  svg {
    font-size: 1.125rem;
    margin-right: 0.5rem;
  }
  font-size: 0.875rem;
  border-bottom: 2px solid transparent;
  color: ${palette.gray7};
  &.active {
    background: ${palette.teal0};
    color: ${palette.teal6};
    border-bottom: 2px solid ${palette.teal6};
  }
`;

export default MainTopHead;
