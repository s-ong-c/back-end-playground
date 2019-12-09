import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishPreview from '../../components/write/PublishPreview';
import { changeDescription, setThumbnail } from '../../modules/write';
import useUpload from '../../lib/hooks/useUpload';
import useS3Upload from '../../lib/hooks/useS3Upload';

const mapStateToProps = (state: RootState) => ({
  title: state.write.title,
  description: state.write.description,
  defaultDescription: state.write.defaultDescription,
  thumbnail: state.write.thumbnail,
});
const mapDispatchToProps = {
  changeDescription,
  setThumbnail,
};
interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type PublishPreviewContainerProps = OwnProps &
  StateProps &
  DispatchProps;
const PublishPreviewContainer: React.FC<PublishPreviewContainerProps> = ({
  title,
  description,
  defaultDescription,
  changeDescription,
  thumbnail,
  setThumbnail,
}) => {
  const onChangeDescription = React.useCallback(
    (descritpion: string) => changeDescription(descritpion),
    [changeDescription],
  );
  const [upload, file] = useUpload();
  const [s3Upload, image] = useS3Upload();
  const onUpload = () => {
    upload();
  };
  React.useEffect(() => {
    if (!file) return;
    s3Upload(file, {
      type: 'post',
    });
  }, [file, s3Upload]);

  React.useEffect(() => {
    if (!image) return;
    setThumbnail(image);
  }, [image, setThumbnail]);

  const onResetThumbnail = React.useCallback(() => {
    setThumbnail(null);
  }, [setThumbnail]);

  return (
    <PublishPreview
      title={title}
      defaultDescription={defaultDescription}
      description={description}
      onChangeDescription={onChangeDescription}
      onUpload={onUpload}
      thumbnail={thumbnail}
      onResetThumbnail={onResetThumbnail}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishPreviewContainer);
