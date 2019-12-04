import * as React from 'react';
import styled from 'styled-components';
import PublishSection from './PublishSection';
import { AddListIcon } from '../../static/svg';
import palette from '../../lib/styles/palette';

const PublishSeriesSectionBlock = styled(PublishSection)``;
const SeriesButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  outline: none;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.05);
  color: ${palette.teal5};
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
  svg {
    font-size: 0.875rem;
  }
  &:hover {
    background: #fdfdfd;
  }
`;
export interface PublishSeriesSectionProps {}

const PublishSeriesSection: React.FC<PublishSeriesSectionProps> = props => {
  return (
    <PublishSeriesSectionBlock title="시리즈 설정">
      <SeriesButton>
        <AddListIcon />
        시리즈에 추가하기
      </SeriesButton>
    </PublishSeriesSectionBlock>
  );
};

export default PublishSeriesSection;
