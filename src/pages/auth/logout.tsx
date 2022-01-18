import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import {auth} from '../../database/firebase';
import logging from '../../database/logging';
import { STable, SButton, SP } from '../../styles/authStyles';


const LogoutPage: React.FunctionComponent = props => {
    const history = useHistory();

    const Logout = () => {
        auth.signOut()
        .then(() => history.push('/login'))
        .catch((error: any) => logging.error(error));
    }

    return (
        <STable>
        <AuthContainer>
            <SP className='text-center'>Jsi si jistý, že se chceš odhlásit?</SP>
            <div className='text-center'>
                <SButton color="danger" className="mr-2" onClick={() => history.goBack()}>Zrušit</SButton>
                <SButton color="info" className="mr-2" onClick={() => Logout()}>Odhlásit se</SButton>
            </div>
        </AuthContainer>
        </STable>
    );
}

export default LogoutPage;