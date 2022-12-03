import React from 'react'
type FormWrapperProps = {
    title: string
    children: React.ReactNode
}

export const FormWrapperHOC: React.FC<FormWrapperProps> = ({ title, children }: FormWrapperProps) => {
    return (
        <div>
            <h1>{title}</h1>
            {children}
        </div>
    );
}