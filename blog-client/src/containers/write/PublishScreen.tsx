import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishScreenTemplate from '../../components/write/PublishScreenTemplate';
import PublishPreviewContainer from './PublishPreviewContainer';

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type PublishScreenProps = OwnProps & StateProps & DispatchProps;

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {};

const PublishScreen: React.SFC<PublishScreenProps> = props => {
  return (
    <PublishScreenTemplate
      left={<PublishPreviewContainer />}
      right="여기는 right"
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishScreen);
