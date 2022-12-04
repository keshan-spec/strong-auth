import { FormWrapperHOC } from '../FormWrapperHOC';

type stateData = {
    fullname: string;
    age: number;
    gender: string;
}

type FormProps = stateData & {
    updateField: (fields: Partial<stateData>) => void
}

export const UserForm: React.FC<FormProps> = ({ fullname, age, gender, updateField }) => {
    return (
        <FormWrapperHOC title="User Details">
            <div>
                <label htmlFor="name">Fullname</label>
                <input type="text" required id="name" onChange={e => updateField({ fullname: e.target.value })} value={fullname} />
                <label htmlFor="age">Age</label>
                <input type="number" required id="age" onChange={e => updateField({ age: parseInt(e.target.value) })} value={age} />
                <label htmlFor="gender">Gender</label>
                <select id="gender" onChange={e => updateField({ gender: e.target.value })} value={gender}>
                    <option value="0">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
        </FormWrapperHOC>
    );
}