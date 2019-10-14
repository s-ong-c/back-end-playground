import * as React from 'react';
import { connect, batch } from 'react-redux';
import QuillEditor from '../../components/write/QuillEditor';
import { RootState } from '../../modules';
import {
  convertEditorMode,
  changeTitle,
  changeMarkdown,
  openPublish,
} from '../../modules/write';
import TagInputContainer from './TagInputContainer';
import WriteFooter from '../../components/write/WriteFooter';

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type QuillEditorContainerProps = OwnProps & StateProps & DispatchProps;

const mapStateToProps = ({ write }: RootState) => ({
  mode: write.mode,
  title: write.title,
  html: write.html,
});
const mapDispatchToProps = {
  convertEditorMode,
  changeTitle,
  changeMarkdown,
  openPublish,
};

const QuillEditorContainer: React.FC<QuillEditorContainerProps> = ({
  mode,
  title,
  changeMarkdown,
  convertEditorMode,
  changeTitle,
  openPublish,
  html,
}) => {
  const onConvertEditorMode = (markdown: string) => {
    batch(() => {
      changeMarkdown(markdown);
      convertEditorMode();
    });
  }; // after transition
  const onChangeTitle = (title: string) => changeTitle(title);
  const onPulish = React.useCallback(() => {
    openPublish();
  }, [openPublish]);
  return (
    <QuillEditor
      title={title}
      onConvertEditorMode={onConvertEditorMode}
      onChangeTitle={onChangeTitle}
      initialHtml={html}
      tagInput={<TagInputContainer />}
      footer={<WriteFooter onPublish={onPulish} onTempSave={() => {}} />}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(QuillEditorContainer);
