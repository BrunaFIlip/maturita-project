import React, { useEffect, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { Button, FormGroup, Input, Spinner } from 'reactstrap';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import {auth} from '../../database/firebase';
import logging from '../../database/logging';
import queryString from 'querystring';

const ResetPasswordPage: React.FunctionComponent<RouteComponentProps> = props => {
    const [verifying, setVerifying] = useState<boolean>(true);
    const [verified, setVerified] = useState<boolean>(false);
    const [changing, setChanging] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [oobCode, setOobCode] = useState<string>('');
    const [error, setError] = useState<string>('');

    const history = useHistory();

    useEffect(() => {
        logging.info('Extracting code');

        let stringParams = queryString.parse(props.location.search);

        if (stringParams)
        {
            let oobCode = stringParams.oobCode as string;

            if (oobCode)
            {
                logging.info('Code found');
                verifyPasswordResetLink(oobCode);
            }
            else
            {
                logging.error('Unable to find code');
                setVerified(false);
                setVerifying(false);
            }
        }
        else
        {
            logging.error('Unable to find code');
            setVerified(false);
            setVerifying(false);
        }
        // eslint-disable-next-line
    }, []);

    const verifyPasswordResetLink = (_oobCode: string) => {
        auth.verifyPasswordResetCode(_oobCode)
        .then((result:any) => {
            logging.info(result);
            setOobCode(_oobCode);
            setVerified(true);
            setVerifying(false);
        })
        .catch((error:any) => {
            logging.error(error);
            setVerified(false);
            setVerifying(false);
        });
    }

    const passwordResetRequest = () => {
        if (password !== confirm)
        {
            setError('Ujistěte se, že jsou obě hesla stejná.');
            return;
        }

        if (error !== '') setError('');

        setChanging(true);

        auth.confirmPasswordReset(oobCode, password)
        .then(() => {
            history.push('/login');
        })
        .catch((error:any) => {
            logging.error(error);
            setError(error.message);
            setChanging(false);
        })
    }

    return (
        <AuthContainer>
            {verifying ?
                <Spinner color="info" />
            :
                <>
                    {verified ?
                        <>
                            <p>Je za potřebí silnější heslo.</p>
                            <FormGroup>
                                <Input 
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
                                <Input 
                                    autoComplete="new-password"
                                    type="password"
                                    name="confirm"
                                    id="confirm"
                                    placeholder="Potvrdit heslo"
                                    onChange={event => setConfirm(event.target.value)}
                                    value={confirm}
                                />
                            </FormGroup>
                            <Button
                                disabled={changing}
                                color="success"
                                block
                                onClick={() => passwordResetRequest()}
                            >
                                Resetovat heslo
                            </Button>
                            <ErrorText error={error} />
                        </>
                    :
                        <p>Špatný email.</p>
                    }
                </>
            }
        </AuthContainer>
    );
}

export default ResetPasswordPage;