import * as React from 'react';
import { render } from 'react-testing-library';
import PostHead, { PostHeadProps } from '../PostHead';
import { MemoryRouter } from 'react-router';

describe('PostHead', () => {
  const setup = (props: Partial<PostHeadProps> = {}) => {
    const initialProps: PostHeadProps = {
      title: 'title',
      tags: ['tagA', 'tagB'],
      username: 'songc',
      date: new Date(Date.now() - 1000 * 60 * 60 * 5).toString(),
      thumbnail:
        'https://images.songc.io/images/songc/post/759061ac-b56f-4b8c-b63e-b9a92a1170dd/image.png',
      hideThumbnail: false,
    };
    const utils = render(
      <MemoryRouter>
        <PostHead {...initialProps} {...props} />
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };
  it('renders property', () => {
    setup();
  });
  it('renders title', () => {
    const { getByText } = setup();
    getByText('title');
  });
  it('renders username', () => {
    const { getByText } = setup();
    getByText('songc');
  });
  it('renders date', () => {
    const { getByText } = setup();
    getByText('약 5시간 전');
  });
  it('renders tags', () => {
    const { getByText } = setup();
    getByText('tagA');
    getByText('tagB');
  });
  it('renders thumbnail', () => {
    const { getByAltText } = setup();
    getByAltText('post-thumbnail');
  });
  it('hides thumbnail', () => {
    const { queryByAltText } = setup({
      hideThumbnail: true,
    });
    const thumbnail = queryByAltText('post-thumbnail');
    expect(thumbnail).toBeFalsy();
  });
});
