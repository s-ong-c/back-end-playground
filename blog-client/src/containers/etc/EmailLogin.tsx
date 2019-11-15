import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import qs from 'qs';
import { emailCodeLogin } from '../../lib/api/auth';
import client from '../../lib/graphql/client';
import { GET_CURRENT_USER, CurrentUser } from '../../lib/graphql/user';
import storage from '../../lib/storage';
import { setUser } from '../../modules/core';
import { RootState } from '../../modules';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {
  setUser,
};
interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type EmailLoginProps = OwnProps &
  StateProps &
  DispatchProps &
  RouteComponentProps;

//interface EmailLoginProps extends RouteComponentProps<{}> {}

const { useEffect, useCallback } = React;

/**
 * Login with email code
 * @param props
 */
const EmailLogin: React.SFC<EmailLoginProps> = ({ location, history }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const process = useCallback(async () => {
    try {
      await emailCodeLogin(query.code);
      const response = await client.query<{ auth: CurrentUser }>({
        query: GET_CURRENT_USER,
        fetchPolicy: 'network-only',
      });
      storage.setItem('CURRENT_USER', response.data.auth);
      history.replace('/');
    } catch (e) {
      // TODO : show 401;
      history.replace('/');
    }
  }, [history, query.code]);

  useEffect(() => {
    if (!query.code) {
      // TODO: show 404
      history.replace('/');
    }
    process();
  }, [history, location.search, process, query.code]);
  return null;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(EmailLogin));
