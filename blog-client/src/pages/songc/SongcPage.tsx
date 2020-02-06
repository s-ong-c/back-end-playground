import * as React from 'react';
import SongcPageTemplate from '../../components/songc/SongcPageTemplate';
import { RouteComponentProps, Route } from 'react-router';
import ConfigLoader from '../../containers/songc/ConfigLoader';
import PostPage from './PostPage';

export interface SongcPageProps
  extends RouteComponentProps<{
    username: string;
    urlSlug: string;
  }> {}

const SongcPage: React.FC<SongcPageProps> = ({ match }) => {
  const { username } = match.params;
  return (
    <SongcPageTemplate>
      <ConfigLoader username={username} />
      <Route path="/@:username/:urlSlug" component={PostPage} />
    </SongcPageTemplate>
  );
};

export default SongcPage;
