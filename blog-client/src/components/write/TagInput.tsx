import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagInputBlock = styled.div`
  margin-bottom: 1.5rem;
  [contenteditable='true']:empty:before {
    content: attr(placeholder);
    display: block;
    color: ${palette.gray5};
  }
`;
const EditableContent = styled.div``;
interface TagInputProps {}

const TagInput: React.SFC<TagInputProps> = props => {
  return (
    <TagInputBlock>
      <EditableContent contentEditable={true} placeholder="태그를 입력하세요" />
    </TagInputBlock>
  );
};

export default TagInput;
