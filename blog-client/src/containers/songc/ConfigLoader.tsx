import React, { useEffect } from 'react';
import { GET_SONGC_CONFIG, SongcConfig } from '../../lib/graphql/user';
import { connect } from 'react-redux';
import { setUserLogo, setCustom, setSongcUsername } from '../../modules/header';
import { RootState } from '../../modules';
import { useQuery } from '@apollo/react-hooks';

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
  const { data, error } = useQuery<{ songc_config: SongcConfig }>(
    GET_SONGC_CONFIG,
    {
      variables: {
        username,
      },
    },
  );

  useEffect(() => {
    setCustom(true);
    return () => {
      setCustom(false);
    };
  }, [setCustom]);

  useEffect(() => {
    setSongcUsername(username);
  }, [setSongcUsername, username]);

  if (error) {
    console.log(error);
  }
  if (!data) return null;
  return (
    <ConfigEffect
      songcConfig={data.songc_config}
      onConfigChange={setUserLogo}
    />
  );
};
export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  () => ({}),
  mapDispatchToProps,
)(ConfigLoader);
