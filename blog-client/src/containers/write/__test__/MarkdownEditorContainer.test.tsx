import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import MarkdownEditorContainer, {
  MarkdownEditorContainerProps,
} from '../MarkdownEditorContainer';
import { Provider } from 'react-redux';
import rootReducer from '../../../modules';
import { createStore } from 'redux';
import { changeMarkdown } from '../../../modules/write';

describe('MarkdownEditorContainer', () => {
  const setup = (props: Partial<MarkdownEditorContainerProps> = {}) => {
    const store = createStore(rootReducer);
    const utils = render(
      <Provider store={store}>
        <MarkdownEditorContainer {...props} />
      </Provider>,
    );
    return {
      store,
      ...utils,
    };
  };
  it('renders property', () => {
    setup();
  });
  it('open publish screen', () => {
    const utils = setup();
    const publishButton = utils.getByText('출간하기');
    fireEvent.click(publishButton);
    expect(utils.store.getState().write);
  });
  it('sets stripped markdown to defaultDescription', () => {
    const utils = setup();
    const { store } = utils;
    store.dispatch(changeMarkdown('# heading\nHello World'));
    const publishButton = utils.getByText('출간하기');
    fireEvent.click(publishButton);
    expect(utils.store.getState().write.defaultDescription).toBe('Hello World');
  });
});
