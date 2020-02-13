import * as React from 'react';
import MainTemplate from '../../components/main/MainTemplate';
// import MainSideMenu from '../../components/main/MainSideMenu';
import MainNoticeWidget from '../../components/main/MainNoticeWidget';
import MainRightFooter from '../../components/main/MainRightFooter';
import { Route } from 'react-router';
import RecentPostsPage from './RecentPostsPage';
import MainTopHead from '../../components/main/MainTopHead';
import MainTrendingWidget from '../../containers/main/MainTrendingWidget';

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = props => {
  return (
    <MainTemplate>
      <MainTemplate.Left>{/* <MainSideMenu /> */}</MainTemplate.Left>
      <MainTemplate.Main>
        <MainTopHead />
        <Route path="/recent" component={RecentPostsPage} />
      </MainTemplate.Main>
      <MainTemplate.Right>
        <MainTrendingWidget />
        <MainNoticeWidget />
        <MainRightFooter />
      </MainTemplate.Right>
    </MainTemplate>
  );
};

export default MainPage;
