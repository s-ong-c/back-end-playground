import * as React from 'react';
import { render } from 'react-testing-library';
import PublishPreviewContainer, {
  PublishPreviewContainerProps,
} from '../PublishPreviewContainer';
import { Provider } from 'react-redux';
import rootReducer from '../../../modules';
import { createStore } from 'redux';
import { changeTitle } from '../../../modules/write';

describe('PublishPreview', () => {
  const setup = (props: Partial<PublishPreviewContainerProps> = {}) => {
    const store = createStore(rootReducer);
    const utils = render(
      <Provider store={store}>
        <PublishPreviewContainer {...props} />
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
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  it('renders title', () => {
    const utils = setup();
    utils.store.dispatch(changeTitle('title is changed'));
    utils.getByText('title is changed');
  });
});
