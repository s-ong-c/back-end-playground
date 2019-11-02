import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishPrivacySettings from '../../components/write/PublishPrivacySettings';
import { setPrivacy } from '../../modules/write';
const mapStateToProps = (state: RootState) => ({
  isPrivate: state.write.isPrivate,
});
const mapDispatchToProps = {
  setPrivacy,
};
interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type PublishPrivacySettingContainerProps = OwnProps &
  StateProps &
  DispatchProps;

const PublishPrivacySettingContainer: React.SFC<
  PublishPrivacySettingContainerProps
> = ({ isPrivate, setPrivacy }) => {
  const onSelect = React.useCallback(
    isPrivate => {
      setPrivacy(isPrivate);
    },
    [setPrivacy],
  );
  return <PublishPrivacySettings isPrivate={isPrivate} onSelect={onSelect} />;
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishPrivacySettingContainer);
