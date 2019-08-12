import React from 'react';
import { render, fireEvent} from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import AuthModalContainer from '../AuthModalContainer';
import rootReducer, { RootState } from '../../../modules';
import { Provider } from 'react-redux';

describe('AuthForm',() => {
    const setupStore = () => {
        const state = rootReducer(undefined, { type: '@@INIT'});
        const mockstore = configureMockStore<RootState>([]);
        return mockstore(state);
    }
    it('renders correctly', () => {
        const store = setupStore();
        const { container} = render(
            <Provider store={store}>
                <AuthModalContainer />
            </Provider>,
        );
        expect(container).toMatchSnapshot();
    });
})