import React, { useRef } from 'react';
import { MdMoreVert } from 'react-icons/md';
//import {  } from 'react-icons/di';
import { FiThumbsUp, FiActivity } from 'react-icons/fi';
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
          <FiThumbsUp />
          EDITOR's PICK
        </MenuItem>
        <MenuItem to="/recent" activeClassName="active">
          <FiActivity />
          RECENTS
        </MenuItem>
        {/* <MenuItem to="/Frontend" activeClassName="active">
          <DiReact className="reactIcon" />
          FE.DEV
        </MenuItem>
        <MenuItem to="/Backend" activeClassName="active">
          <FiCode />
          BE.DEV
        </MenuItem> */}
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
  width: 8rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 800;
  svg {
    font-size: 1.125rem;
    margin-right: 0.5rem;
  }
  .reactIcon {
    color:#61DBFB;
  }
  font-size: 0.875rem;
  border-bottom: 2px solid transparent;
  /* color: ${palette.gray7}; */
  color:rgba(0,0,0,.65) !important;
  &.active {
    background: ${palette.teal0};
    color:rgba(0,0,0,.84) !important;
    border-bottom: 2px solid #0184bc;
  }
`;

export default MainTopHead;
