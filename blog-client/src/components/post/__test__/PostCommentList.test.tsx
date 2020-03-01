import * as React from 'react';
import { render } from 'react-testing-library';
import PostCommentList, { PostCommentListProps } from '../PostCommentList';
import { Comment } from '../../../lib/graphql/post';

describe('PostCommentList', () => {
  const sample: Comment[] = [
    {
      id: '08c90847-f078-4e9a-9e0a-af2b28173958',
      user: {
        id: '425807ff-9f89-4e09-ba43-8a4e56c54a0c',
        username: 'songc',
        profile: {
          thumbnail:
            'https://faint1122.s3.ap-northeast-2.amazonaws.com/Image+from+iOS+(1).jpg',
        },
      },
      text: 'comment#1',
      replies_count: 0,
      created_at: '2020-02-24T14:03:29.242Z',
    },
    {
      id: '500ffbea-b290-4891-81fe-8f80083635c5',
      user: {
        id: '425807ff-9f89-4e09-ba43-8a4e56c54a0c',
        username: 'songc',
        profile: {
          thumbnail:
            'https://faint1122.s3.ap-northeast-2.amazonaws.com/Image+from+iOS+(1).jpg',
        },
      },
      text: 'comment#2',
      replies_count: 0,
      created_at: '2020-02-24T14:09:40.553Z',
    },
    {
      id: 'ef163c10-395e-4b4b-af11-1f79876baf0e',
      user: {
        id: '425807ff-9f89-4e09-ba43-8a4e56c54a0c',
        username: 'songc',
        profile: {
          thumbnail:
            'https://faint1122.s3.ap-northeast-2.amazonaws.com/Image+from+iOS+(1).jpg',
        },
      },
      text: 'comment#3',
      replies_count: 0,
      created_at: '2020-03-01T14:06:07.845Z',
    },
    {
      id: '2669f1c1-4fd9-4c81-8340-fc974a64e4a0',
      user: {
        id: '425807ff-9f89-4e09-ba43-8a4e56c54a0c',
        username: 'songc',
        profile: {
          thumbnail:
            'https://faint1122.s3.ap-northeast-2.amazonaws.com/Image+from+iOS+(1).jpg',
        },
      },
      text: 'comment#4',
      replies_count: 0,
      created_at: '2020-03-01T14:06:07.845Z',
    },
  ];
  const setup = (props: Partial<PostCommentListProps> = {}) => {
    const initialProps: PostCommentListProps = {
      comments: sample,
    };
    const utils = render(<PostCommentList {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders comments List', () => {
    const { getByText } = setup();
    getByText('comment#1');
    getByText('comment#2');
    getByText('comment#3');
    getByText('comment#4');
  });
});
