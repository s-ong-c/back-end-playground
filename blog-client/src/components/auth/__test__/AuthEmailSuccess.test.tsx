import * as React from 'react';
import { render } from 'react-testing-library';
import AuthEmailSuccess, { AuthEmailSuccessProps} from '../AuthEmailSuccess';
describe('AuthEmailSuccess', () => {
    const setup = (props: Partial<AuthEmailSuccessProps> = {}) => {
        const initialProps: AuthEmailSuccessProps = {
            registered: false,
        };
        return render(<AuthEmailSuccess {...initialProps} {...props} />)
    };
    it('renders property', () => {
        setup();
    });
    
    it('registerd is true', ()  => {
        const { getByText } = setup({
            registered: true,
        });
        getByText(/로그인 링크/);
    });
    it('registerd is false', ()  => {
        const { getByText } = setup({
            registered: false,
        });
        getByText(/회원가입 링크/);
    });
})