import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PublishPrivacySettingContainer, {
  PublishPrivacySettingContainerProps,
} from '../PublishPrivacySettingContainer';
import { Provider } from 'react-redux';
import rootReducer from '../../../modules';
import { createStore } from 'redux';

describe('PublishPrivacySettingContainer', () => {
  const setup = (props: Partial<PublishPrivacySettingContainerProps> = {}) => {
    const store = createStore(rootReducer);
    const utils = render(
      <Provider store={store}>
        <PublishPrivacySettingContainer {...props} />
      </Provider>,
    );
    const buttons = {
      public: utils.getByText('전체 공개'),
      private: utils.getByText('나만 보기'),
    };
    return {
      ...utils,
      store,
      buttons,
    };
  };
  it('renders property', () => {
    setup();
  });
  it('button is working property', () => {
    const utils = setup();
    const { store, buttons } = utils;
    fireEvent.click(buttons.private);
    expect(store.getState().write.isPrivate).toBeTruthy();
    fireEvent.click(buttons.public);
    expect(store.getState().write.isPrivate).toBeFalsy();
  });
});
