import * as React from 'react';
import styled from 'styled-components';
import PopupOKCancel from '../common/PopupOKCancel';
import { WriteMode } from '../../modules/write';

const AskChangeEditorBlock = styled.div``;

export interface AskChangeEditorProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  convertTo: WriteMode;
}

const AskChangeEditor: React.FC<AskChangeEditorProps> = ({
  visible,
  onCancel,
  onConfirm,
  convertTo,
}) => {
  if (convertTo === WriteMode.MARKDOWN) {
    return (
      <PopupOKCancel
        visible={visible}
        title="마크다운 에디터로 전환"
        onCancel={onCancel}
        onConfirm={onConfirm}
      >
        에디터 모드를 전환하시겠습니까?
      </PopupOKCancel>
    );
  }
  return (
    <PopupOKCancel
      visible={visible}
      title="쉬운 에디터로 전환"
      onCancel={onCancel}
      onConfirm={onConfirm}
    >
      에디터 모드를 전환하시겠습니까?
    </PopupOKCancel>
  );
};

export default AskChangeEditor;
