import * as React from 'react';
import styled from 'styled-components';
import RegisterForm, { RegisterFormType } from '../../components/register/RegisterForm';

const RegisterFormContainerBlock = styled.div``;
interface RegisterFormContainerProps{}

const RegisterFormContainer: React.SFC<RegisterFormContainerProps> = props => {
    const onSubmint = (form: RegisterFormType) => {
        console.log(form);
    }
    return <RegisterForm onSubmit={onSubmint} defaultEmail={"somony9292@gmail.com"}/>;
};

export default RegisterFormContainer;