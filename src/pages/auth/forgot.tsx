import React, { useState } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import {auth} from '../../database/firebase';
import logging from '../../database/logging';
import IPageProps from '../../interfaces/page';
import { SInput, STable, UserBox, SH1, SButton, SP } from '../../styles/authStyles';


const ForgotPasswordPage: React.FunctionComponent<IPageProps> = props => {
    const [sending, setSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    const resetPasswordRequest = () => {
        if (error !== '') setError('');

        setSending(true);

        auth.sendPasswordResetEmail(email)
        .then(() => {
            logging.info('Email sent.');
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
                <SP>A link has been sent to your email with instructions.</SP>
            :
                <>
                    <SP>Please enter your email.</SP>
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
                    <SButton
                        disabled={sending}
                        color="success"
                        onClick={() => resetPasswordRequest()}
                    >
                        Send Reset Link
                    </SButton>
                    <ErrorText error={error} />
                </>
            }
            </UserBox>
        </AuthContainer>
        </STable>
    );
}

export default ForgotPasswordPage;