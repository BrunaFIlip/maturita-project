import React, { useState } from 'react';
import { FormGroup } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import {auth} from '../../database/firebase';
import logging from '../../database/logging';
import { SInput, STable, UserBox, SButton, SP } from '../../styles/authStyles';
import { useHistory } from 'react-router-dom';


const ForgotPasswordPage: React.FunctionComponent = props => {
    const [sending, setSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useHistory();

    const resetPasswordRequest = () => {
        if (error !== '') setError('');

        setSending(true);

        auth.sendPasswordResetEmail(email)
        .then(() => {
            logging.info('Email poslán.');
            setSent(true);
            setSending(false);
        })
        .catch((error:any) => {
            logging.error(error);
            setError(error.message);
            setSending(false);
        });
    }

    return (
        <STable>
        <AuthContainer>
            <UserBox>
            {sent ?
                <SP>Link vám byl poslán na email.</SP>
            :
                <>
                    <SP>Váš email</SP>
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
                    <SButton
                        disabled={sending}
                        color="success"
                        onClick={() => resetPasswordRequest()}
                    >
                        Zaslat link
                    </SButton>
                    <ErrorText error={error} />
                </>
            }
                    <SButton
                        disabled={sending}
                        color="success"
                        onClick={() => history.push("/login")}
                    >
                        Zpět
                    </SButton>
            </UserBox>
        </AuthContainer>
        </STable>
    );
}

export default ForgotPasswordPage;