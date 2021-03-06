import * as React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const WriteFooterBlock = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  height: 4rem;
  width: 100%;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.85);
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledButton = styled(Button)`
  height: 2.5rem;
  font-size: 1.125rem;
  & + & {
    margin-left: 0.75rem;
  }
`;
export interface WriteFooterProps {
  onTempSave: () => void;
  onPublish: () => void;
}

const WriteFooter: React.FC<WriteFooterProps> = ({ onTempSave, onPublish }) => {
  return (
    <WriteFooterBlock>
      <StyledButton color="lightGray" inline onClick={onTempSave}>
        임시저장
      </StyledButton>
      <StyledButton inline color="teal" onClick={onPublish}>
        출간하기
      </StyledButton>
    </WriteFooterBlock>
  );
};

export default WriteFooter;
