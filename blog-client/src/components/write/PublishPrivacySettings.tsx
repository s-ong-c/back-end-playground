import * as React from 'react';
import styled, { css } from 'styled-components';
import PublishSection from './PublishSection';
import { GlobeIcon, LockIcon } from '../../static/svg';
import palette from '../../lib/styles/palette';

const PublishPrivacySettingsBlock = styled(PublishSection)`
  outline: none;
  border: none;
  .contents {
    display: flex;
  }
`;

const Button = styled.button<{ active: boolean }>`
  outline: none;
  border: none;
  flex: 1;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 1.125rem;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  padding: 0;
  padding-left: 1rem;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid transparent;
  &:hover {
    background: #fdfdfd;
  }
  ${props =>
    props.active &&
    css`
      border: solid 1px ${palette.teal5};
      color: ${palette.teal5};
    `}
  svg {
    margin-right: 1.5rem;
  }
  & + & {
    margin-left: 1rem;
  }
`;

export interface PublishPrivacySettingsProps {
  isPrivate: boolean;
  onSelect: (value: boolean) => any;
}
const { useCallback } = React;
const PublishPrivacySettings: React.FC<PublishPrivacySettingsProps> = ({
  isPrivate,
  onSelect,
}) => {
  const onClickPrivate = useCallback(() => {
    onSelect(true);
  }, [onSelect]);
  const onClickPublic = useCallback(() => {
    onSelect(false);
  }, [onSelect]);
  console.log(isPrivate);
  return (
    <PublishPrivacySettingsBlock title="공개 설정">
      <Button active={!isPrivate} onClick={onClickPublic}>
        <GlobeIcon />
        전체 공개
      </Button>
      <Button active={isPrivate} onClick={onClickPrivate}>
        <LockIcon />
        나만 보기
      </Button>
    </PublishPrivacySettingsBlock>
  );
};

export default PublishPrivacySettings;
