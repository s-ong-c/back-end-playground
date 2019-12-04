import * as React from 'react';
import styled from 'styled-components';
import { CurrentUser } from '../../lib/graphql/user';
import { MdArrowDropDown } from 'react-icons/md';
import palette from '../../lib/styles/palette';
import { defaultThumbnail } from '../../static/images';
const HeaderUserIconBlock = styled.div`
  cursor: pointer;
  img {
    display: block;
    width: 3rem;
    height: 3rem;
    box-shadow: 0px 0 8px rgba(0, 0, 0, 0.085);
    border-radius: 1.5rem;
    object-fit: cover;
    transition: 0.125s all ease-in;
  }
  svg {
    font-size: 1.5rem;
    margin-left: 0.25rem;
    color: ${palette.gray6};
    transition: 0.125s all ease-in;
  }
  display: flex;
  align-items: center;
  &:hover {
    img {
      box-shadow: 0px 0 12px rgba(0, 0, 0, 0.1);
    }
    svg {
      color: ${palette.gray9};
    }
  }
`;
export interface HeaderUserIconProps {
  user: CurrentUser;
  onClick: () => void;
}

const HeaderUserIcon: React.FC<HeaderUserIconProps> = ({ onClick, user }) => {
  return (
    <HeaderUserIconBlock onClick={onClick}>
      <img src={user.profile.thumbnail || defaultThumbnail} alt="thumbnail" />
      <MdArrowDropDown />
    </HeaderUserIconBlock>
  );
};

export default HeaderUserIcon;
