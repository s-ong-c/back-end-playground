import * as React from 'react';
import { render, waitForElement } from 'react-testing-library';
import PostViewer, { PostViewerProps } from '../PostViewer';
import { MockedProvider } from 'react-apollo/test-utils';
import { READ_POST } from '../../../lib/graphql/post';
import { MemoryRouter } from 'react-router';

describe('PostViewer', () => {
  const setup = (props: Partial<PostViewerProps> = {}, overrideMocks?: any) => {
    const initialProps: PostViewerProps = {
      username: 'songc',
      urlSlug: 'sample',
    };

    const mocks = [
      {
        request: {
          query: READ_POST,
          variables: {
            username: 'songc',
            urlSlug: 'sample',
          },
        },
        result: {
          data: {
            post: {
              id: '15c0f420-737e-41ea-8a06-58a40f8f7dc8',
              title: '제목입니다',
              released_at: '2019-12-19T01:56:56.556Z',
              updated_at: '2019-12-19T01:56:56.556Z',
              tags: [],
              body: '내용입니다',
              is_markdown: false,
              is_temp: false,
              thumbnail:
                'https://images.songc.io/images/songc/post/95ae89a6-a932-4b99-9ab4-a39b9385d8df/image.png',
              user: {
                id: '425807ff-9f89-4e09-ba43-8a4e56c54a0c',
                username: 'songc',
                profile: {
                  display_name: 'songc',
                  thumbnail:
                    'https://faint1122.s3.ap-northeast-2.amazonaws.com/Image+from+iOS+(1).jpg',
                  short_bio: '안녕하세요',
                },
                songc_config: {
                  id: 'f72da2d7-9bd5-4395-8270-f6e41377a936',
                  title: 'SONGC',
                },
              },
            },
          },
        },
      },
    ];

    const utils = render(
      <MockedProvider mocks={overrideMocks || mocks} addTypename={false}>
        <MemoryRouter>
          <PostViewer {...initialProps} {...props} />
        </MemoryRouter>
      </MockedProvider>,
    );
    return {
      ...utils,
    };
  };
  it('renders post correctly', async () => {
    const { getByText, getByAltText } = setup();
    waitForElement(() => getByText('제목입니다'));
    waitForElement(() => getByAltText('post-thumbnail'));
  });
  it('hides thumbnail if exists in body', async () => {
    const mocks = [
      {
        request: {
          query: READ_POST,
          variables: {
            username: 'songc',
            urlSlug: 'sample',
          },
        },
        result: {
          data: {
            post: {
              id: '15c0f420-737e-41ea-8a06-58a40f8f7dc8',
              title: '제목입니다',
              released_at: '2019-12-19T01:56:56.556Z',
              updated_at: '2019-12-19T01:56:56.556Z',
              tags: [],
              body: '내용입니다',
              is_markdown: true,
              is_private: false,
              is_temp: false,
              thumbnail:
                'https://images.songc.io/images/songc/post/95ae89a6-a932-4b99-9ab4-a39b9385d8df/image.png',
              user: {
                id: '425807ff-9f89-4e09-ba43-8a4e56c54a0c',
                username: 'songc',
                profile: {
                  display_name: 'songc',
                  thumbnail:
                    'https://faint1122.s3.ap-northeast-2.amazonaws.com/Image+from+iOS+(1).jpg',
                  short_bio: '안녕하세요',
                },
                songc_config: {
                  id: 'f72da2d7-9bd5-4395-8270-f6e41377a936',
                  title: 'SONGC',
                },
              },
            },
          },
        },
      },
    ];

    const { getByText, queryByAltText } = setup(undefined, mocks);
    waitForElement(() => getByText('제목입니다'));
    const thumbnail = queryByAltText('post-thumbnail');
    expect(thumbnail).toBeFalsy();
  });
});
