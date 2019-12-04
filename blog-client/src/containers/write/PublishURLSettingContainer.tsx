import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishURLSetting from '../../components/write/PublishURLSetting';
import { escapeForUrl } from '../../lib/utils';
import { changeUrlSlug } from '../../modules/write';

const mapStateToProps = (state: RootState) => ({
  username: state.core.user && state.core.user.username,
  title: state.write.title,
  urlSlug: state.write.urlSlug,
});
const mapDispatchToProps = {
  changeUrlSlug,
};
interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type PublishURLSettingContainerProps = OwnProps &
  StateProps &
  DispatchProps;

const PublishURLSettingContainer: React.FC<PublishURLSettingContainerProps> = ({
  username,
  title,
  urlSlug,
  changeUrlSlug,
}) => {
  const defaultUrlSlug = escapeForUrl(title);
  const urlSlugToShow = urlSlug || defaultUrlSlug;
  const onChangeUrlSlug = useCallback(urlSlug => changeUrlSlug(urlSlug), [
    changeUrlSlug,
  ]);
  if (!username) return null;
  return (
    <PublishURLSetting
      username={username}
      urlSlug={urlSlugToShow}
      onChangeUrlSlug={onChangeUrlSlug}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishURLSettingContainer);
