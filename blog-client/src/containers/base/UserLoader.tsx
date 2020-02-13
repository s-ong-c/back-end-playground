import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { CurrentUser, GET_CURRENT_USER } from '../../lib/graphql/user';
import { RootState } from '../../modules';
import { setUser } from '../../modules/core';
import { useQuery } from '@apollo/react-hooks';

const DetectUserChange: React.FC<{
  user: CurrentUser | null;
  onSetUser: (user: CurrentUser | null) => void;
}> = ({ user, onSetUser }) => {
  useEffect(() => {
    onSetUser(user);
  }, [onSetUser, user]);
  return null;
};

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {
  setUser,
};

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type UserLoaderProps = OwnProps & StateProps & DispatchProps;

const UserLoader: React.FC<UserLoaderProps> = ({ setUser }) => {
  const onSetUser = useCallback(
    (user: CurrentUser | null) => {
      setUser(user);
    },
    [setUser],
  );

  const getCurrentUser = useQuery<{ auth: CurrentUser }>(GET_CURRENT_USER);
  const user = getCurrentUser.data ? getCurrentUser.data.auth : undefined;
  if (!user) return null;
  return <DetectUserChange user={user} onSetUser={onSetUser} />;

  // <Query query={GET_CURRENT_USER}>
  //   {({ loading, error, data }: QueryResult<{ auth: CurrentUser }>) => {
  //     if (loading || error) return null;
  //     const user = data && data.auth;
  //     if (!user) return null;
  //     return <DetectUserChange user={user} onSetUser={onSetUser} />;
  //   }}
  // </Query>
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(UserLoader);
