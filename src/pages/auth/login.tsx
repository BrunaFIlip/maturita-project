import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import {auth} from '../../database/firebase';
import logging from '../../database/logging';
import IPageProps from '../../interfaces/page';
import { SInput, STable, UserBox, SH1, SButton, SP } from '../../styles/authStyles';

const LoginPage: React.FunctionComponent<IPageProps> = props => {
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useHistory();

    const signInWithEmailAndPassword = () => {
        if (error !== '') setError('');

        setAuthenticating(true);

        auth.signInWithEmailAndPassword(email, password)
        .then((result: any) => {
            logging.info(result);
            history.push('/');
        })
        .catch((error: any) => {
            logging.error(error);
            setAuthenticating(false);
            setError(error.message);
        });
    }

    return (
        <STable>
        <AuthContainer>
            <UserBox>
            <SH1>Login</SH1>
            <FormGroup>
                <SInput 
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                />
            </FormGroup>
            <FormGroup>
                <SInput 
                    autoComplete="new-password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                />
            </FormGroup>
            </UserBox>
            <SButton
                disabled={authenticating}
                color="success"
                onClick={() => signInWithEmailAndPassword()}
            >
                Login
            </SButton>
                <SP>Don't have an account? <Link to="/register">Register here.</Link></SP>
                <SP><Link to="/forget">Forget your password?</Link></SP>
            <ErrorText error={error} />
            <hr className="bg-info m-3" />
        </AuthContainer>
        </STable>
    );
}

export default LoginPage;