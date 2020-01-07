import React, { useEffect } from 'react';
import { Query, QueryResult } from 'react-apollo';
import { GET_SONGC_CONFIG, SongcConfig } from '../../lib/graphql/user';
import { connect } from 'react-redux';
import { setUserLogo } from '../../modules/header';

export interface ConfigLoaderProps {
  username: string;
}
interface ConfigEffectProps {
  songcConfig: SongcConfig;
  setUserLogo: typeof setUserLogo;
}

// interface ConfigEffectDispatchProps {
//   setUserLogo: typeof setUserLogo;
// }
const ConfigEffect: React.FC<ConfigEffectProps> = ({
  songcConfig,
  setUserLogo,
}) => {
  useEffect(() => {
    setUserLogo(songcConfig);
  }, [setUserLogo, songcConfig]);
  return null;
};
const ConfigEffectContainer = connect(() => ({}), { setUserLogo })(
  ConfigEffect,
);

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
        return <ConfigEffectContainer songcConfig={data.songc_config} />;
      }}
    </Query>
  );
};

export default ConfigLoader;
