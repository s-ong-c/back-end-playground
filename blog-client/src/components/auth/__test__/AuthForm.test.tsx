import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import AuthForm, { AuthFormProps } from '../AuthForm';
import { AuthMode } from '../../../modules/core';

describe('AuthForm', () => {
  const setup = (props: Partial<AuthFormProps> = {}) => {
    const initialProps: AuthFormProps = {
      mode: 'REGISTER',
      onToggleMode: () => {},
      onSendAuthEmail: (email: string) => {},
      loading: false,
      registered: null,
    };
    return render(<AuthForm {...initialProps} {...props} />);
  };
  it('renders correctly', () => {
    const { container } = setup();
    // expect(container).toMatchSnapshot();
  });

  describe('handles modes', () => {
    it('REGISTER', () => {
      const { getByTestId } = setup();
      const title = getByTestId('title');
      expect(title).toHaveTextContent('회원가입');
    });
    it('LOGIN', () => {
      const { getByTestId } = setup({ mode: 'LOGIN' });
      const title = getByTestId('title');
      expect(title).toHaveTextContent('로그인');
    });
  });

  it('calls onToggleMode', () => {
    const onToggleMode = jest.fn();
    const { container } = setup({
      mode: 'REGISTER',
      onToggleMode,
    });
    const anchor = container.querySelector('.link');
    expect(anchor).toBeTruthy();
    if (!anchor) return;
    fireEvent.click(anchor);
    expect(onToggleMode.mock.calls.length).toBe(1);
  });
});
