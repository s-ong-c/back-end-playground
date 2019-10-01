import * as React from 'react';
import styled from 'styled-components';
import PublishSection from './PublishSection';

const PublishPrivacySettingsBlock = styled(PublishSection)`
  outline: none;
  border: none;
  .contents {
    display: flex;
  }
`;

const Button = styled.button`
  outline: none;
  border: none;
  flex: 1;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.125rem;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
  & + & {
    margin-left: 1rem;
  }
`;
export interface PublishPrivacySettingsProps {}

const PublishPrivacySettings: React.SFC<
  PublishPrivacySettingsProps
> = props => {
  return (
    <PublishPrivacySettingsBlock title="공개 설정">
      <Button>전체 공개</Button>
      <Button>나만 보기</Button>
    </PublishPrivacySettingsBlock>
  );
};

export default PublishPrivacySettings;
