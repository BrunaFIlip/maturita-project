import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import {auth} from '../../database/firebase';
import logging from '../../database/logging';
import IPageProps from '../../interfaces/page';
import { STable, SButton, SP } from '../../styles/authStyles';


const LogoutPage: React.FunctionComponent<IPageProps> = props => {
    const history = useHistory();

    const Logout = () => {
        auth.signOut()
        .then(() => history.push('/login'))
        .catch((error: any) => logging.error(error));
    }

    return (
        <STable>
        <AuthContainer>
            <SP className='text-center'>Are you sure you want to logout?</SP>
            <div className='text-center'>
                <SButton color="danger" className="mr-2" onClick={() => history.goBack()}>Cancel</SButton>
                <SButton color="info" className="mr-2" onClick={() => Logout()}>Logout</SButton>
            </div>
        </AuthContainer>
        </STable>
    );
}

export default LogoutPage;