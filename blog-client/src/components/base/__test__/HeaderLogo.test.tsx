import * as React from 'react';
import { render } from 'react-testing-library';
import HeaderLogo, { HeaderLogoProps } from '../HeaderLogo';
import { MemoryRouter } from 'react-router-dom';
describe('HeaderLogo', () => {
  const setup = (props: Partial<HeaderLogoProps> = {}) => {
    const initialProps: HeaderLogoProps = {
      custom: false,
      userLogo: null,
      songcUsername: null,
    };
    const utils = render(
      <MemoryRouter>
        <HeaderLogo {...initialProps} {...props} />
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };
  it('renders property', () => {
    setup();
  });
  it('shows logo svg when custom is false', () => {
    const { getByTestId } = setup();
    getByTestId('songc-logo');
  });
  it('shows null when custom is true and data is not loaded', () => {
    const utils = setup({
      custom: true,
      userLogo: null,
      songcUsername: 'songc',
    });
    expect(utils.container.innerHTML).toBe('');
  });
  it('shows custom songc title when custom is true and data is loaded', () => {
    const { getByText } = setup({
      custom: true,
      userLogo: {
        logo_image: null,
        title: 'songc',
      },
      songcUsername: 'songc',
    });
    getByText('songc');
  });
  it('shows fallback songc title when songc title is null', () => {
    const { getByText } = setup({
      custom: true,
      userLogo: {
        logo_image: null,
        title: null,
      },
      songcUsername: 'songc',
    });
    getByText(`songc's Story`);
  });
  it('shows fallback songc title with username ends with s', () => {
    const { getByText } = setup({
      custom: true,
      userLogo: {
        logo_image: null,
        title: null,
      },
      songcUsername: 'usernames',
    });
    console.log(getByText);
    getByText(`usernames' Story`);
  });
});
