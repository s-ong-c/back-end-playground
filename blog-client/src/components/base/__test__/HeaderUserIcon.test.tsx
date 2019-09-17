import * as React from 'react';
import { render } from 'react-testing-library';
import HeaderUserIcon, { HeaderUserIconProps } from '../HeaderUserIcon';

describe('HeaderUserIcon', () => {
  const setup = (props: Partial<HeaderUserIconProps> = {}) => {
    const initialProps: HeaderUserIconProps = {
      user: {
        id: '',
        username: '',
        profile: {
          thumbnail: '',
          display_name: 'test',
        },
      },
      onClick: () => undefined,
    };
    const utils = render(<HeaderUserIcon {...initialProps} {...props} />);
    return { ...utils };
  };
  it('renders property', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
