import * as React from 'react';
import Info from './Info';
import ContextSample from './ContextSample';
import Average from './Average';

const { useState } = React;

interface InfoPageProps {}

const InfoPage: React.FC<InfoPageProps> = props => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <ContextSample />
      <Average />
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? 'Hide' : 'Show'}
      </button>
      <br />
      <br />
      {visible && <Info />}
    </div>
  );
};

export default InfoPage;
