import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import RegisterForm, { RegisterFormProps } from '../RegisterForm';
import { StaticRouter, MemoryRouter } from 'react-router';

describe('RegisterForm', () => {
  const setup = (props: Partial<RegisterFormProps> = {}) => {
    const initialProps: RegisterFormProps = {
      onSubmit: () => {},
      defaultEmail: null,
      error: null,
    };
    const utils = render(
      <MemoryRouter>
        <RegisterForm {...initialProps} {...props} />
      </MemoryRouter>,
    );
    const form = {
      displayName: utils.getByPlaceholderText(/이름을/) as HTMLInputElement,
      email: utils.getByPlaceholderText(/이메일을/) as HTMLInputElement,
      username: utils.getByPlaceholderText(/아이디를/) as HTMLInputElement,
      shortBio: utils.getByPlaceholderText(/당신을/) as HTMLInputElement,
    };
    const changeInputs = () => {
      fireEvent.change(form.displayName, {
        target: {
          value: '송민석',
        },
      });
      fireEvent.change(form.email, {
        target: {
          value: 'somony9292@gmail.com',
        },
      });
      fireEvent.change(form.username, {
        target: {
          value: 'songc',
        },
      });
      fireEvent.change(form.shortBio, {
        target: {
          value: '안녕하세요',
        },
      });
    };
    return {
      ...utils,
      form,
      changeInputs,
    };
  };
  it('renders property', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('changes input', () => {
    const utils = setup();
    const { form, getByDisplayValue, changeInputs } = utils;
    changeInputs();
    getByDisplayValue('송민석');
    getByDisplayValue('somony9292@gmail.com');
    getByDisplayValue('songc');
    getByDisplayValue('안녕하세요');
  });
  it('submits form', () => {
    const onSubmit = jest.fn();
    const utils = setup({
      onSubmit,
    });
    const { getByText } = utils;
    utils.changeInputs();
    const button = getByText('다음');
    fireEvent.click(button);
    // expect(onSubmit).toBeCalledWith({
    //   displayName: '송민석',
    //   email: 'somony9292@gmail.com',
    //   username: 'songc',
    //   shortBio: '안녕하세요',
    // });
  });
  it('should show default email and lock', () => {
    const utils = setup({
      defaultEmail: 'somony9292@gmail.com',
    });
    expect(utils.form.email.value).toBe('somony9292@gmail.com');
    expect(utils.form.email.disabled).toBeTruthy();
    expect(utils.container.querySelector('svg')).toBeVisible();
  });
});
