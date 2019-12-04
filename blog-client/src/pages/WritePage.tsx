import * as React from 'react';
import styled from 'styled-components';

import ActiveEditor from '../containers/write/ActiveEditor';
import HeaderContainer from '../containers/base/HeaderContainer';
import PublishScreen from '../containers/write/PublishScreen';

const WritePageBlock = styled.div`
  width: 100%;
  height: 100%;
`;

interface WritePageProps {}

const WritePage: React.FC<WritePageProps> = props => {
  return (
    <WritePageBlock>
      <HeaderContainer />
      <ActiveEditor />
      <PublishScreen />
    </WritePageBlock>
  );
};

export default WritePage;
