import * as React from 'react';
import RegisterForm, { RegisterFormType } from '../../components/register/RegisterForm';
import useRequest from '../../lib/hooks/useRequest';
import { getRegisterToken, GetRegisterTokenResponse, localEmailRegister, RegisterResponse } from '../../lib/api/auth';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import qs from 'qs';

interface RegisterFormContainerProps extends RouteComponentProps<{}> {}
const { useEffect, useState} = React;
const RegisterFormContainer: React.SFC<RegisterFormContainerProps> = ({
    match,
    location
}) => {
    const query: {code?: string} = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const [onGetRegisterToken, loading, registerToken] = useRequest<
        GetRegisterTokenResponse
    >((code: string) =>  getRegisterToken(code));

    const [error, setError] = useState<null | string>(null);
    const [
        onLocalRegister, 
        localRegisterLoading,
        localRegisterResult
    ] = useRequest<RegisterResponse>(localEmailRegister);

    const onSubmint = (form: RegisterFormType) => {
        // validate
        const validation = {
            displayName: (text: string) => {
            if (text === '') {
                return '이름을 입력해주세요.';
            }
            if (text.length > 45) {
                return '이름은 최대 45자까지 입력 할 수 있습니다.';
            }
            return null;
            },
            username: (text: string) => {
                if (!/^[a-z0-9-_]{3,16}$/.test(text)) {
                  return '아이디는 3~16자의 알파벳,숫자,혹은 - _ 으로 이루어져야 합니다.';
                }
              },
            shortBio: (text: string) => {
            if (text.length > 140) {
                return `한 줄 소개는 140자 미만으로 입력해주세요. (현재 ${
                text.length
                }자)`;
            }
            },
        };

        const error =
        validation.displayName(form.displayName) ||
        validation.username(form.username) ||
        validation.shortBio(form.shortBio) ||
        null;

        if (error) {
            console.log(error);
            setError(error);
            return;
          }

        if (query.code) {
            const formWithoutEmail = {...form};
            delete formWithoutEmail.email;
            onLocalRegister({
                registerToken: registerToken && registerToken.register_token, 
                form: formWithoutEmail
            });
        }
    };

    // get Register token on mount
    useEffect(() => {
        if (!query.code) {
            // TODO : show Error page
        }
        onGetRegisterToken(query.code);
    }, []);
    return (
        <RegisterForm 
            onSubmit={onSubmint} 
            defaultEmail={registerToken && registerToken.email}
            error={error}
        />
    );
};

export default withRouter(RegisterFormContainer);