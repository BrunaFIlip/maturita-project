import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import {auth} from '../../database/firebase';
import logging from '../../database/logging';
import IPageProps from '../../interfaces/page';
import { SInput, STable, UserBox, SH1, SButton, SP } from '../../styles/authStyles';


const RegisterPage: React.FunctionComponent<IPageProps> = props => {
    const [registering, setRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useHistory();

    const signUpWithEmailAndPassword = () => {
        if (password !== confirm)
        {
            setError('Prosím ujistěte se, že vaše heslo je správně.');
            return;
        }

        if (error !== '') setError('');

        setRegistering(true);

        auth.createUserWithEmailAndPassword(email, password)
        .then((result: any) => {
            logging.info(result);
            history.push('/login');
        })
        .catch((error: any) => {
            logging.error(error);

            if (error.code.includes('auth/weak-password'))
            {
                setError('Please enter a stronger password.');
            }
            else if (error.code.includes('auth/email-already-in-use'))
            {
                setError('Email already in use.');
            }
            else
            {
                setError('Unable to register.  Please try again later.')
            }

            setRegistering(false);
        });
    }

    return (
        <STable>
        <AuthContainer>
            <UserBox>
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
            <FormGroup>
                <SInput 
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Confirm Password"
                    onChange={event => setConfirm(event.target.value)}
                    value={confirm}
                />
            </FormGroup>
            </UserBox>
            <SButton
                disabled={registering}
                color="success"
                onClick={() => signUpWithEmailAndPassword()}
                >
                Sign Up
            </SButton>
                <SP>Already have an account? <Link to="/login">Login.</Link></SP>
            <ErrorText error={error} />
        </AuthContainer>
        </STable>
    );
}

export default RegisterPage;