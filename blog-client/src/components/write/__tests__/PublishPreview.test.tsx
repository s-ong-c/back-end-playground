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
      onResetThumbnail: () => {},
      onUpload: () => {},
      thumbnail: null,
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
  it('ignores enter', async () => {
    const onChangeDescription = jest.fn();
    const utils = setup({ onChangeDescription });
    fireEvent.keyDown(utils.textarea, {
      keyCode: 13,
    });
    await new Promise(resolve => setTimeout(resolve, 1));
    expect(onChangeDescription).not.toBeCalled();
  });
  it('calls onUpload', () => {
    const onUpload = jest.fn();
    const utils = setup({ onUpload });
    const uploadButton = utils.getByText('썸네일 업로드');
    fireEvent.click(uploadButton);
    expect(onUpload).toBeCalled();
  });
  it('shows a thumbnail', () => {
    const utils = setup({
      thumbnail:
        'https://images.songc.io/images/songc/post/832ac2e5-5d74-40ce-93eb-d84ba0d8d837/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-11-14%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011.46.21.png',
    });
    const image = utils.getByTestId('image') as HTMLImageElement;
    expect(image).toHaveAttribute(
      'src',
      'https://images.songc.io/images/songc/post/832ac2e5-5d74-40ce-93eb-d84ba0d8d837/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202019-11-14%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011.46.21.png',
    );
    utils.getByText('재업로드');
    utils.getByText('제거');
  });
});
