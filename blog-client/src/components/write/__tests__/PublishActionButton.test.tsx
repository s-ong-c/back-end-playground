import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PublishActionButton, {
  PublishActionButtonProps,
} from '../PublishActionButton';

describe('PublishActionButton', () => {
  const setup = (props: Partial<PublishActionButtonProps> = {}) => {
    const initialProps: PublishActionButtonProps = {
      onCancel: () => {},
      onPublish: () => {},
    };
    const utils = render(<PublishActionButton {...initialProps} {...props} />);
    const buttons = {
      cancel: utils.getByText('취소'),
      publish: utils.getByText('출간하기'),
    };
    return {
      ...utils,
      buttons,
    };
  };
  it('renders property', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  it('calls onCancel and onPublish', () => {
    const onCancel = jest.fn();
    const onPublish = jest.fn();
    const utils = setup({
      onCancel,
      onPublish,
    });
    fireEvent.click(utils.buttons.publish);
    expect(onPublish).toBeCalled();
    fireEvent.click(utils.buttons.cancel);
    expect(onCancel).toBeCalled();
  });
});
