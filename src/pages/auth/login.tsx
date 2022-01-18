import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import {auth} from '../../database/firebase';
import logging from '../../database/logging';
import { SInput, STable, UserBox, SH1, SButton, SP } from '../../styles/authStyles';

const LoginPage: React.FunctionComponent = props => {
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
            <SH1>Přihlásit se</SH1>
            <FormGroup>
                <SInput 
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Emailová adresa"
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
                    placeholder="Heslo"
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
                <SP>Nemáte účet? <Link to="/register">Registrovat se.</Link></SP>
                <SP><Link to="/forget">Zapomenuté heslo?</Link></SP>
            <ErrorText error={error} />
            <hr className="bg-info m-3" />
        </AuthContainer>
        </STable>
    );
}

export default LoginPage;