import React from 'react'
import { FormWrapperHOC } from '../FormWrapperHOC';

type stateData = {
    email: string;
    fullname: string;
}

type FormProps = stateData & {
    updateField: (fields: Partial<stateData>) => void
}

export const ExampleComponent: React.FC<FormProps> = ({ fullname, email, updateField }) => {
    return (
        <FormWrapperHOC title="Example Form">
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" required id="name" onChange={e => updateField({ fullname: e.target.value })} value={fullname} />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" required id="email" onChange={e => updateField({ email: e.target.value })} value={email} />
            </div>
        </FormWrapperHOC>
    );
}