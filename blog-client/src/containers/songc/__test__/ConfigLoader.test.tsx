import * as React from 'react';
import { waitForDomChange } from 'react-testing-library';
import ConfigLoader, { ConfigLoaderProps } from '../ConfigLoader';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_SONGC_CONFIG } from '../../../lib/graphql/user';
import renderWithRedux from '../../../lib/renderWithRedux';
import waitUntil from '../../../lib/waitUntil';

describe('ConfigLoader', () => {
  const setup = (props: Partial<ConfigLoaderProps> = {}) => {
    const initialProps: ConfigLoaderProps = { username: 'songc' };
    const mocks = [
      {
        request: {
          query: GET_SONGC_CONFIG,
          variables: {
            username: 'songc',
          },
        },
        result: {
          data: {
            songc_config: { title: 'SONGC', logo_image: null },
          },
        },
      },
    ];
    const utils = renderWithRedux(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ConfigLoader {...initialProps} {...props} />
      </MockedProvider>,
    );
    return {
      ...utils,
    };
  };
  it('renders property', () => {
    setup();
  });
  it('loads GET_SONGC_CONFIG and dispatches SET_USER_LOGO action', async () => {
    const { container, store } = setup();
    const userLogo = store.getState().header.userLogo;
    await waitUntil(() => store.getState().header.userLogo !== userLogo);
    console.log(store.getState().header.userLogo);
    expect(store.getState().header.userLogo).toHaveProperty('title', 'SONGC');
  });
});
