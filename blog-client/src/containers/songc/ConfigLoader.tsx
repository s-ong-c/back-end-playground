import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { GET_SONGC_CONFIG, SongcConfig } from '../../lib/graphql/user';

export interface ConfigLoaderProps {
  username: string;
}

const ConfigLoader: React.FC<ConfigLoaderProps> = ({ username }) => {
  return (
    <Query query={GET_SONGC_CONFIG} variables={{ username }}>
      {({
        loading,
        data,
        error,
      }: QueryResult<{ songc_config: SongcConfig }>) => {
        if (error) {
          console.log(error);
        }
        if (error || loading) return null;
        if (!data) return null;
        return <div>{data.songc_config.title}</div>;
      }}
    </Query>
  );
};

export default ConfigLoader;
