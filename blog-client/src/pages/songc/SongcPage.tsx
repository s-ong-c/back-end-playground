import * as React from 'react';
import SongcPageTemplate from '../../components/songc/SongcPageTemplate';
import { RouteComponentProps } from 'react-router';
import ConfigLoader from '../../containers/songc/ConfigLoader';

export interface SongcPageProps
  extends RouteComponentProps<{
    username: string;
  }> {}

const SongcPage: React.FC<SongcPageProps> = ({ match }) => {
  return (
    <SongcPageTemplate>
      <ConfigLoader username={match.params.username} />
    </SongcPageTemplate>
  );
};

export default SongcPage;
