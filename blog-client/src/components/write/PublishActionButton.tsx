import * as React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
const PublishActionButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const StyledButton = styled(Button)`
  height: 2.5rem;
  padding-left: 1.12rem;
  padding-right: 1.12rem;
  & + & {
    margin-left: 0.875rem;
  }
`;
export interface PublishActionButtonProps {
  onCancel: () => void;
  onPublish: () => void;
}

const PublishActionButton: React.SFC<PublishActionButtonProps> = ({
  onCancel,
  onPublish,
}) => {
  return (
    <PublishActionButtonBlock>
      <StyledButton data-testid="cancelPublish" color="gray" onClick={onCancel}>
        취소
      </StyledButton>
      <StyledButton data-testid="publish" onClick={onPublish}>
        출간하기
      </StyledButton>
    </PublishActionButtonBlock>
  );
};

export default PublishActionButton;
