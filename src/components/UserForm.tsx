import { FormWrapperHOC } from '../FormWrapperHOC';
import ReactSelect from "react-select";

type stateData = {
    fullname: string;
    age: number;
    gender: string;
}

type FormProps = stateData & {
    updateField: (fields: Partial<stateData>) => void
}

export const UserForm: React.FC<FormProps> = ({ fullname, age, gender, updateField }) => {
    const options = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
        { value: 'noprefer', label: 'Prefer not to say' }
    ]
    return (
        <FormWrapperHOC title="User Details">
            <div>
                <label htmlFor="name">Fullname</label>
                <input type="text" required id="name" onChange={e => updateField({ fullname: e.target.value })} value={fullname} /></div>
            <div>
                <label htmlFor="age">Age</label>
                <input type="number" required id="age" onChange={e => updateField({ age: parseInt(e.target.value) })} value={age} />
            </div>
            <div>
                <label htmlFor="gender">Gender</label>
                <ReactSelect
                    required
                    options={options}
                    value={options.find(option => option.value == gender) || null}
                    onChange={(e: any) => updateField({ gender: e.value })}
                />
            </div>
        </FormWrapperHOC>
    );
}