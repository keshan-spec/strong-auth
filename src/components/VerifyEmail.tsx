import React from 'react'

type FormProps = {
    email: string;
}

export const VerifyEmail: React.FC<FormProps> = ({ email }) => {
    return (
        <div>
            <h1>Verify Email</h1>
            <p>Please verify your email address by clicking the link sent to {email}</p>
        </div>
    );
}