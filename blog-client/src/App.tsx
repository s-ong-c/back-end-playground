import * as React from 'react';
import { Route } from 'react-router';
import MainPage from './pages/main/MainPage';
import loadable from '@loadable/component';
const mainPage = loadable(() => import('./pages/main/MainPage'));
interface AppProps {}

const App: React.SFC<AppProps> = props => {
  return (
  <>
    <Route 
      path={['/','/tranding','/recent','/following']} 
      component={MainPage}
      exact  
    />
  </>
  );
};

export default App;