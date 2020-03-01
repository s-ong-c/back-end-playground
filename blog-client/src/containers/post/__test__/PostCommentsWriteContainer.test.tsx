import * as React from 'react';
import PostCommentsWriteContainer, {
  PostCommentsWriteContainerProps,
} from '../PostCommentsWriteContainer';
import { fireEvent } from '@testing-library/react';
import renderWithProviders from '../../../lib/renderWithProviders';

describe('PostCommentsWriteContainer', () => {
  const setup = (props: Partial<PostCommentsWriteContainerProps> = {}) => {
    const initialProps: PostCommentsWriteContainerProps = {
      postId: '41536102-556e-4d8c-9e83-5ae81acdf5e5',
      commentId: 'f69dcf5c-5947-4da1-9151-6f0550ee47c7',
    };
    const utils = renderWithProviders(
      <PostCommentsWriteContainer {...initialProps} {...props} />,
    );

    const textarea = utils.getByPlaceholderText(
      '댓글을 작성하세요',
    ) as HTMLTextAreaElement;
    const writeButton = utils.getByText('댓글 작성');
    return {
      textarea,
      writeButton,
      ...utils,
    };
  };
  it('changes textarea', () => {
    const { textarea } = setup();
    fireEvent.change(textarea, {
      target: {
        value: 'hello',
      },
    });
    expect(textarea.value).toBe('hello');
  });
});
