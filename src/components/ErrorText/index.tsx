import React from 'react';
import { SErrorText } from '../../styles/authStyles';

export interface IErrorTextProps {
    error: string;
}

const ErrorText: React.FunctionComponent<IErrorTextProps> = props => {
    const { error } = props;

    if (error === '') return null;

    return (
        <SErrorText>
            {error}
        </SErrorText>
    );
}

export default ErrorText;