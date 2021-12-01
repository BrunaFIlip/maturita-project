import React from 'react';
import { Redirect } from 'react-router-dom';
import {auth} from '../../database/firebase';
import logging from '../../database/logging';
import Sidebar from '../Sidebar/Sidebar';
import { Padding } from '../../styles/padding';

export interface IAuthRouteProps { }

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props;

    if (!auth.currentUser)
    {
        logging.warn('No user detected, redirecting');
        return <Redirect to="/login" />;
    }

    return (
        <div><Sidebar/><Padding>{children}</Padding></div>
    );
}

export default AuthRoute;