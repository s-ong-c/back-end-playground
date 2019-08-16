import * as React from 'react';
import RegisterForm, { RegisterFormType } from '../../components/register/RegisterForm';
import useRequest from '../../lib/hooks/useRequest';
import { getRegisterToken, GetRegisterTokenResponse } from '../../lib/api/auth';
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
    const onSubmint = (form: RegisterFormType) => {
        console.log(form);
    };
    const [onGetRegisterToken, loading, registerToken] = useRequest<
        GetRegisterTokenResponse
    >((code: string) =>  getRegisterToken(code));

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