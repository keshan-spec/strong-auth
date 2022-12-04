import { FormWrapperHOC } from '../FormWrapperHOC';

type stateData = {
    email: string;
    password: string;
}

type FormProps = stateData & {
    updateField: (fields: Partial<stateData>) => void
}

export const AccountDetailsForm: React.FC<FormProps> = ({ password, email, updateField }) => {
    return (
        <FormWrapperHOC title="Account Details">
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" required id="email" onChange={e => updateField({ email: e.target.value })} value={email} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" required id="password" onChange={e => updateField({ password: e.target.value })} />
            </div>
        </FormWrapperHOC>
    );
}