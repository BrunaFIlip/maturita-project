import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormGroup } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import {auth} from '../../database/firebase';
import logging from '../../database/logging';
import { SInput, STable, UserBox, SButton, SP, SH1 } from '../../styles/authStyles';


const RegisterPage: React.FunctionComponent = props => {
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
                setError('Je za potřebí silnější heslo.');
            }
            else if (error.code.includes('auth/email-already-in-use'))
            {
                setError('Email již někdo používá.');
            }
            else
            {
                setError('Něco se nepovedlo. Zkustě to prosím později.')
            }

            setRegistering(false);
        });
    }

    return (
        <STable>
        <AuthContainer>
            <UserBox>
                <SH1>Registrace</SH1>
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
            <FormGroup>
                <SInput 
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="Potvrdit heslo"
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
                Registrovat
            </SButton>
                <SP>Už más účet? <Link to="/login">Přihlásit se.</Link></SP>
            <ErrorText error={error} />
        </AuthContainer>
        </STable>
    );
}

export default RegisterPage;