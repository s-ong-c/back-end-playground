import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TagInputBlock = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  display: flex;
  flex-wrap: auto;
  [contenteditable='true']:empty:before {
    content: attr(placeholder);
    display: block;
    color: ${palette.gray5};
  }
`;
const EditableContent = styled.div`
  display: inline-flex;
  outline: none;
  cursor: text;
  font-size: 1.125rem;
`;

const Tag = styled.div`
  margin-right: 1rem;
`;
interface TagInputProps {
  ref?: React.RefObject<HTMLDivElement>;
}
const TagItem: React.FC<{}> = props => {
  return <Tag># {props.children}</Tag>;
};

const { useState, useCallback, useEffect, useRef } = React;
const TagInput: React.SFC<TagInputProps> = (props, ref) => {
  const [tags, setTags] = useState<string[]>([]);
  const [value, setValue] = useState('');
  const editableDiv = useRef<HTMLDivElement>(null);
  const onChange = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    console.log(e.currentTarget.innerHTML);
    setValue(e.currentTarget.innerHTML);
  }, []);
  useEffect(() => {
    if (editableDiv.current) {
      if (value === '') {
        editableDiv.current.innerHTML = value;
      }
    }
  }, [value]);

  const onPaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    document.execCommand('insertText', false, text);
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const keys = [',', 'Enter'];
      if (keys.includes(e.key)) {
        e.preventDefault();
        setTags([...tags, e.currentTarget.innerHTML]);
        setValue('');
      }
    },
    [tags],
  );

  return (
    <TagInputBlock>
      {tags.map(tag => (
        <TagItem key={tag}>{tag}</TagItem>
      ))}
      <EditableContent
        contentEditable={true}
        placeholder="태그를 입력하세요"
        tabIndex={2}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        onInput={onChange}
        ref={editableDiv}
      />
    </TagInputBlock>
  );
};

export default TagInput;
