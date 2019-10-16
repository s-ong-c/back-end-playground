import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PublishScreen, { PublishScreenProps } from '../PublishScreen';
import { Provider } from 'react-redux';
import rootReducer from '../../../modules';
import { createStore } from 'redux';
import { closePublish, openPublish } from '../../../modules/write';

describe('PublishScreen', () => {
  const setup = (props: Partial<PublishScreenProps> = {}) => {
    const store = createStore(rootReducer);
    const utils = render(
      <Provider store={store}>
        <PublishScreen {...props} />
      </Provider>,
    );
    return {
      ...utils,
      store,
    };
  };
  it('renders property', () => {
    setup();
  });
  it('handles visibility properly', () => {
    const utils = setup();
    expect(utils.queryByText('포스트카드 미리보기')).toBeFalsy();
    utils.store.dispatch(openPublish());
    utils.store;
    utils.getByText('포스트카드 미리보기');
  });
  it('closes PublishScreen when cancel button is clicked', () => {
    const utils = setup();
    utils.store.dispatch(openPublish());
    utils.getByText('포스트카드 미리보기');
    const cancelButton = utils.getByText('취소');
    fireEvent.click(cancelButton);
    expect(utils.queryByText('취소')).toBeFalsy();
  });
});