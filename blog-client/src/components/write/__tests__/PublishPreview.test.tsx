import * as React from 'react';
import { render } from 'react-testing-library';
import PublishPreview, { PublishPreviewProps } from '../PublishPreview';

describe('PublishPreview', () => {
  const setup = (props: Partial<PublishPreviewProps> = {}) => {
    const initialProps: PublishPreviewProps = {
      title: '타이틀',
    };
    const utils = render(<PublishPreview {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders property', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  it('renders title', () => {
    const utils = setup({ title: 'title is changed' });
    utils.getByText('title is changed');
  });
});
