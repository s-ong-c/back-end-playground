import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishURLSetting from '../../components/write/PublishURLSetting';

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {};
interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type PublishURLSettingContainerProps = OwnProps &
  StateProps &
  DispatchProps;

const PublishURLSettingContainer: React.SFC<
  PublishURLSettingContainerProps
> = props => {
  return (
    <PublishURLSetting
      username="SONGC"
      urlSlug="sample-title"
      onChangeUrlSlug={() => {}}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishURLSettingContainer);
