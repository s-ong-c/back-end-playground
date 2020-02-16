import * as React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';

const PostCommentsWriteBlock = styled.div`
  > .button-wrapper {
    display: flex;
    justify-content: flex-end;
  }
`;
const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  padding: 1rem;
  border: 1px solid ${palette.gray2};
  margin-bottom: 1.5rem;
  outline: none;
  width: 100%;
  border-radius: 4px;
  min-height: 5rem;
  font-size: 1rem;
  color: ${palette.gray9};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.75;
  &::placeholder {
    color: ${palette.gray5};
    font-size: 0.75rem;
  }
`;
export interface PostCommentsWriteProps {
  comment: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onWrite: () => void;
}

const PostCommentsWrite: React.FC<PostCommentsWriteProps> = ({
  comment,
  onChange,
  onWrite,
}) => {
  return (
    <PostCommentsWriteBlock>
      <StyledTextArea
        placeholder="댓글을 작성하세요"
        value={comment}
        onChange={onChange}
      />
      <div className="button-wrapper">
        <Button inline onClick={onWrite}>
          댓글 작성
        </Button>
      </div>
    </PostCommentsWriteBlock>
  );
};

export default PostCommentsWrite;
