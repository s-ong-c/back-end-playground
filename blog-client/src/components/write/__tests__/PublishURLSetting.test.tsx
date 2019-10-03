import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PublishURLSetting, {
  PublishURLSettingProps,
} from '../PublishURLSetting';

describe('PublishURLSetting', () => {
  const setup = (props: Partial<PublishURLSettingProps> = {}) => {
    const initialProps: PublishURLSettingProps = {
      username: 'SONGC',
      urlSlug: 'url-slug',
      onChangeUrlSlug: () => {},
    };
    const utils = render(<PublishURLSetting {...initialProps} {...props} />);
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
  it('show username props', () => {
    const utils = setup();
    utils.getByText('/@SONGC/');
  });
  it('urlSlug is working property', () => {
    const onChangeUrlSlug = jest.fn();
    const utils = setup({
      onChangeUrlSlug,
    });
    const input = utils.getByValue('url-slug');
    fireEvent.change(input, { target: { value: 'hello-world' } });
    expect(onChangeUrlSlug).toBeCalledWith('hello-world');
  });
});
