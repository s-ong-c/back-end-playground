import * as React from 'react';
import RegisterForm, { RegisterFormType } from '../../components/register/RegisterForm';
import useRequest from '../../lib/hooks/useRequest';
import { getRegisterToken, GetRegisterTokenResponse, localEmailRegister } from '../../lib/api/auth';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import qs from 'qs';

interface RegisterFormContainerProps extends RouteComponentProps<{}> {}
const { useEffect} = React;
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

    const [
        onLocalRegister, 
        localRegisterLoading,
        localRegisterResult
    ] = useRequest(localEmailRegister);

    const onSubmint = (form: RegisterFormType) => {
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
        />
    );
};

export default withRouter(RegisterFormContainer);