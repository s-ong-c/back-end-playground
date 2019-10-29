import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PublishPreview, { PublishPreviewProps } from '../PublishPreview';

describe('PublishPreview', () => {
  const setup = (props: Partial<PublishPreviewProps> = {}) => {
    const initialProps: PublishPreviewProps = {
      title: '타이틀',
      description: '',
      defaultDescription: '',
      onChangeDescription: () => {},
    };
    const utils = render(<PublishPreview {...initialProps} {...props} />);
    const textarea = utils.getByPlaceholderText(
      '당신의 포스트를 소개해보세요',
    ) as HTMLTextAreaElement;
    return {
      textarea,
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
  it('shows default description', () => {
    const utils = setup({
      defaultDescription: 'default',
    });
    expect(utils.textarea.value).toBe('default');
  });
  it('shows description', () => {
    const utils = setup({
      description: 'Hello',
      defaultDescription: 'default',
    });
    expect(utils.textarea.value).toBe('Hello');
  });
  it('shows the right length', () => {
    const utils = setup({
      description: 'onetwothree',
    });
    utils.getByText('11/150');
  });
  it('calls onChangeDescription', () => {
    const onChangeDescription = jest.fn();
    const utils = setup({
      onChangeDescription,
    });
    fireEvent.change(utils.textarea, {
      target: {
        value: 'hello there',
      },
    });
    expect(onChangeDescription).toBeCalledWith('hello there');
  });
  it('shows the right length', () => {
    const utils = setup({
      description: 'onetwothree',
    });
    utils.getByText('11/150');
  });
  it('text limit turns red', () => {
    const longDescription = new Array(150).fill('a').join('');
    const utils = setup({ description: longDescription });
    const textLimitDiv = utils.getByText('150/150');
    expect(window.getComputedStyle(textLimitDiv).color).toBe(
      'rgb(250, 82, 82)',
    );
  });
});
