import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import WriteFooter, { WriteFooterProps } from '../WriteFooter';

describe('WriteFooter', () => {
  const setup = (props: Partial<WriteFooterProps> = {}) => {
    const initialProps: WriteFooterProps = {
      onTempSave: () => {},
      onPublish: () => {},
    };
    const utils = render(<WriteFooter {...initialProps} {...props} />);

    const buttons = {
      tempSave: utils.getByText('임시저장'),
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
  it('buttons are working property', () => {
    const onPublish = jest.fn();
    const onTempSave = jest.fn();
    const utils = setup({ onPublish, onTempSave });
    const { tempSave, publish } = utils.buttons;
    fireEvent.click(tempSave);
    expect(onTempSave).toBeCalled();
    fireEvent.click(publish);
    expect(onPublish).toBeCalled();
  });
});
