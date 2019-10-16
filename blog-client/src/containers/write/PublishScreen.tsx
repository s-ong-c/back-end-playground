import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishScreenTemplate from '../../components/write/PublishScreenTemplate';
import PublishPreviewContainer from './PublishPreviewContainer';
import PublishPrivacySettingContainer from './PublishPrivacySettingContainer';
import PublishURLSettingContainer from './PublishURLSettingContainer';
import PublishSeriesSectionContainer from './PublishSeriesSectionContainer';
import PublishActionButton from '../../components/write/PublishActionButton';
import { closePublish } from '../../modules/write';
interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type PublishScreenProps = OwnProps & StateProps & DispatchProps;

const mapStateToProps = ({ write }: RootState) => ({
  visible: write.publish,
});
const mapDispatchToProps = {
  closePublish,
};
const { useCallback } = React;
const PublishScreen: React.SFC<PublishScreenProps> = ({
  visible,
  closePublish,
}) => {
  const onCancel = useCallback(() => {
    console.log('aa');
    closePublish();
  }, [closePublish]);

  return (
    <PublishScreenTemplate
      visible={visible}
      left={<PublishPreviewContainer />}
      right={
        <>
          <div>
            <PublishPrivacySettingContainer />
            <PublishURLSettingContainer />
            <PublishSeriesSectionContainer />
          </div>
          <PublishActionButton onCancel={onCancel} onPublish={() => {}} />
        </>
      }
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishScreen);
