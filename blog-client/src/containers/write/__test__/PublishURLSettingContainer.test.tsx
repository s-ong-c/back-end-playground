import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PublishURLSettingContainer, {
  PublishURLSettingContainerProps,
} from '../PublishURLSettingContainer';
import { Provider } from 'react-redux';
import rootReducer from '../../../modules';
import { createStore } from 'redux';
import { setUser } from '../../../modules/core';
import { dummy } from '../../../modules/__tests__/core.test';
import { changeTitle, changeUrlSlug } from '../../../modules/write';
describe('PublishURLSettingContainer', () => {
  const setup = (props: Partial<PublishURLSettingContainerProps> = {}) => {
    const store = createStore(rootReducer);
    const utils = render(
      <Provider store={store}>
        <PublishURLSettingContainer {...props} />
      </Provider>,
    );
    store.dispatch(setUser(dummy));

    return {
      ...utils,
      store,
    };
  };
  it('shows right username', () => {
    const utils = setup();
    utils.getByText('/@dummy/');
  });
  it('shows the default url slug', () => {
    const utils = setup();
    utils.store.dispatch(changeTitle('this title'));
    utils.getByDisplayValue('this-title');
  });
  it('shows the custom url slug', () => {
    const utils = setup();
    utils.store.dispatch(changeUrlSlug('custom-url'));
    utils.getByDisplayValue('custom-url');
  });
  it('changes custom url slug', () => {
    const utils = setup();
    const input = utils.container.getElementsByTagName('input')[0];
    expect(input).toBeTruthy();
    fireEvent.change(input, {
      target: {
        value: 'hello-world',
      },
    });
    expect(utils.store.getState().write.urlSlug).toBe('hello-world');
  });
});
