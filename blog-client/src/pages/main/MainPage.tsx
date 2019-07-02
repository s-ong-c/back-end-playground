import * as React from 'react';
import styled from 'styled-components';

const MainPageBlock = styled.div``;
interface MainPageProps {
}

const MainPage: React.SFC<MainPageProps> = props => {
  return <MainPageBlock>메인이다.</MainPageBlock>;
};

export default MainPage;