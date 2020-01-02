import * as React from 'react';
import styled from 'styled-components';
import PageTemplate from '../base/PageTemplate';

const SongcPageTemplateBlock = styled(PageTemplate)``;
export interface SongcPageTemplateProps {}

const SongcPageTemplate: React.FC<SongcPageTemplateProps> = props => {
  return <SongcPageTemplateBlock />;
};

export default SongcPageTemplate;
