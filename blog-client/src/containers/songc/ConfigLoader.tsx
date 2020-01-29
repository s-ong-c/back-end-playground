import React, { useEffect } from 'react';
import { Query, QueryResult } from 'react-apollo';
import { GET_SONGC_CONFIG, SongcConfig } from '../../lib/graphql/user';
import { connect } from 'react-redux';
import { setUserLogo, setCustom, setSongcUsername } from '../../modules/header';
import { RootState } from '../../modules';

interface ConfigEffectProps {
  songcConfig: SongcConfig;
  onConfigChange: (config: SongcConfig) => any;
}

const ConfigEffect: React.FC<ConfigEffectProps> = ({
  songcConfig,
  onConfigChange,
}) => {
  useEffect(() => {
    onConfigChange(songcConfig);
  }, [onConfigChange, songcConfig]);
  return null;
};

const mapDispatchToProps = {
  setUserLogo,
  setCustom,
  setSongcUsername,
};

type OwnProps = {
  username: string;
};
type StateProps = {};
type DispatchProps = typeof mapDispatchToProps;
export type ConfigLoaderProps = OwnProps & StateProps & DispatchProps;
const ConfigLoader: React.FC<ConfigLoaderProps> = ({
  username,
  setCustom,
  setUserLogo,
  setSongcUsername,
}) => {
  useEffect(() => {
    setCustom(true);
    return () => {
      setCustom(false);
    };
  }, [setCustom]);

  useEffect(() => {
    setSongcUsername(username);
  }, [setSongcUsername, username]);
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
        return (
          <ConfigEffect
            songcConfig={data.songc_config}
            onConfigChange={setUserLogo}
          />
        );
      }}
    </Query>
  );
};
export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  () => ({}),
  mapDispatchToProps,
)(ConfigLoader);
