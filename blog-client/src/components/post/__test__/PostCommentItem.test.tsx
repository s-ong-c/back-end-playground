import * as React from 'react';
import { render } from 'react-testing-library';
import PostCommentItem, { PostCommentItemProps } from '../PostCommentItem';
import { Comment } from '../../../lib/graphql/post';
import { formatDate } from '../../../lib/utils';

describe('PostCommentItem', () => {
  const sample: Comment = {
    id: 'f69dcf5c-5947-4da1-9151-6f0550ee47c7',
    user: {
      id: '425807ff-9f89-4e09-ba43-8a4e56c54a0c',
      username: 'songc',
      profile: {
        thumbnail:
          'https://faint1122.s3.ap-northeast-2.amazonaws.com/Image+from+iOS+(1).jpg',
      },
    },
    text: 'Hey there',
    replies_count: 0,
    created_at: '2020-02-16T10:13:56.331Z',
  };
  const setup = (props: Partial<PostCommentItemProps> = {}) => {
    const initialProps: PostCommentItemProps = {
      comment: sample,
    };
    const utils = render(<PostCommentItem {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders property', () => {
    const { getByText, getByAltText } = setup();
    getByText(sample.user.username);
    getByText(formatDate(sample.created_at));
    expect(getByAltText('comment-user-thumbnail')).toHaveAttribute(
      'src',
      'https://faint1122.s3.ap-northeast-2.amazonaws.com/Image+from+iOS+(1).jpg',
    );
    getByText(sample.text);
  });
});
