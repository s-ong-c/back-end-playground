import * as React from 'react';
import OpaqueLayer from '../../components/common/OpaqueLayer';
import CoreContext from '../../contexts/CoreContext';

interface CoreProps{}

const { useContext } = React;
const Core: React.SFC<CoreProps> = props => {
  const { state, actions } = useContext(CoreContext);
  return (
    <>
      <OpaqueLayer visible={state.layer} />
    </>
  );
};

export default Core;