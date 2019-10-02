import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishPrivacySettings, {
  PrivacySetting,
} from '../../components/write/PublishPrivacySettings';

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type PublishPrivacySettingContainerProps = OwnProps &
  StateProps &
  DispatchProps;

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {};

const PublishPrivacySettingContainer: React.SFC<
  PublishPrivacySettingContainerProps
> = props => {
  return (
    <PublishPrivacySettings
      selected={PrivacySetting.PUBLIC}
      onSelect={() => {}}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishPrivacySettingContainer);
