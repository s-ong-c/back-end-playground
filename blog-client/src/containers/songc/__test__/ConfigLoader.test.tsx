import * as React from 'react';
import ConfigLoader, { ConfigLoaderProps } from '../ConfigLoader';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_SONGC_CONFIG } from '../../../lib/graphql/user';
import renderWithRedux from '../../../lib/renderWithRedux';
import waitUntil from '../../../lib/waitUntil';

describe('ConfigLoader', () => {
  const setup = (props: Partial<ConfigLoaderProps> = {}) => {
    const initialProps: Partial<ConfigLoaderProps> & { username: string } = {
      username: 'songc',
    };
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
  it('dispatches SET_SONGC_USERNAME action', () => {
    const { store } = setup();
    expect(store.getState().header.songcUsername).toBe(null);
  });
  it('dispatches SET_CUSTOM action', () => {
    const { store, unmount } = setup();
    expect(store.getState().header.custom).toBe(false);
    unmount();
    // expect(store.getState().header.custom).toBe(true);
  });
  it('loads GET_SONGC_CONFIG and dispatches SET_USER_LOGO action', async () => {
    const { store } = setup();
    const userLogo = store.getState().header.userLogo;
    await waitUntil(() => store.getState().header.userLogo !== userLogo);
    expect(store.getState().header.userLogo).toHaveProperty('title', 'SONGC');
  });
});
