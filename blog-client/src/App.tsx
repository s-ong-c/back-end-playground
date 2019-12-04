import * as React from 'react';
import { Route, Switch } from 'react-router';
import MainPage from './pages/main/MainPage';
import PostPage from './pages/PostPage';
import Core from './containers/base/Core';
import RegisterPage from './pages/RegisterPage';
import EmailLoginPage from './pages/EmailLoginPage';
import WritePage from './pages/WritePage';
// import { CoreProvider } from './contexts/CoreContext';
// const MainPage = loadable(() => import('./pages/main/MainPage'));
// const PostPage = loadable(() => import('./pages/PostPage'));
interface AppProps {}

const App: React.FC<AppProps> = props => {
  return (
    <>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/register" component={RegisterPage} />
        <Route path="/:mode(trending|recent|following)" component={MainPage} />
        <Route path="/@:username/:urlSlug" component={PostPage} />
        <Route path="/email-login" component={EmailLoginPage} />
        <Route paht="/write" component={WritePage} />
        {/* <Route path="/info" component={InfoPage} />
        <Route path="/counter" component={Counter} /> */}
      </Switch>
      <Core />
    </>
  );
};

export default App;
