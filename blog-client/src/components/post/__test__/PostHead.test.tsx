import * as React from 'react';
import { render } from 'react-testing-library';
import PostHead, { PostHeadProps } from '../PostHead';

describe('PostHead', () => {
  const setup = (props: Partial<PostHeadProps> = {}) => {
    const initialProps: PostHeadProps = {
      title: 'title',
      tags: ['tagA', 'tagB'],
      username: 'songc',
      date: new Date(Date.now() - 1000 * 60 * 60 * 5),
    };
    const utils = render(<PostHead {...initialProps} {...props} />);
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
  it('renders tags', () => {});
  it('renders username', () => {});
  it('renders date', () => {});
});
