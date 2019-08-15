import * as React from 'react';
import styled from 'styled-components';
import LabelInput from '../common/LabelInput';
import useInputs from '../../lib/hooks/useInputs';
import RoundButton from '../common/RoundButton';

const RegisterFormBlock = styled.div`
    margin-top: 3rem;
    .buttons {
        margin-top: 6rem;
    }
`;

export type RegisterFormType = {
    displayName: string;
    email: string;
    username: string;
    shortBio: string;
}
export interface RegisterFormProps {
    onSubmit: (form: RegisterFormType) => any;
    defaultEmail: string | null | undefined;
}

const RegisterForm: React.SFC<RegisterFormProps> = ({onSubmit, defaultEmail}) => {
    const [form, onChange] = useInputs<RegisterFormType>({
        displayName: '', 
        email: 'somony9292@gmail.com', 
        username: '', 
        shortBio: ''
    })
    return (
        <RegisterFormBlock>
            <LabelInput 
                name="name"
                label="이름" 
                onChange={onChange}
                placeholder="이름을 입력하세요"
                value={form.displayName} 
                size={20}
            /> 
            <LabelInput 
                name="email"
                label="이메일" 
                onChange={onChange}
                placeholder="이메일을 입력하세요"
                value={form.email} 
                disabled={!!defaultEmail}
                size={25}
            />
            <LabelInput 
                name="username"
                label="아이디" 
                onChange={onChange}
                placeholder="아이디를 입력하세요"
                value={form.username} 
                size={15}
            /> 
            <LabelInput 
                name="shortBio"
                label="한 줄 소개" 
                onChange={onChange}
                placeholder="당신을 한 줄로 소개해보세요"
                value={form.shortBio} 
                size={25}
            /> 
            <div className="buttons">
                <RoundButton inline color="gray" to="/">취소</RoundButton>
                <RoundButton
                    inline
                    type="submit"
                    onClick={() =>
                        onSubmit({ ...form, email: defaultEmail || form.email })
                    }
                >
                    다음
                </RoundButton>
            </div>
        </RegisterFormBlock>
    );
};

export default RegisterForm;