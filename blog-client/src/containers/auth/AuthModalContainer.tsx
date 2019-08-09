import * as React from 'react';
import AuthModal from '../../components/auth/AuthModal';
import CoreContext from '../../contexts/CoreContext';
import AuthForm from '../../components/auth/AuthForm';

interface AuthModalContainerProps{}

const { useContext, useCallback } = React;
const AuthModalContainer: React.SFC<AuthModalContainerProps> = props => {
    const { state, actions } = useContext(CoreContext);
    
    const onClose = useCallback(() => {
        actions.closeAuthModal();
    }, []);
    const { auth } = state;
    return <AuthModal visible={auth.visible} onClose={onClose}>
                <AuthForm mode={auth.mode} />
            </AuthModal>;
    };

export default AuthModalContainer;