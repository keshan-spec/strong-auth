import { FormWrapperHOC } from '../FormWrapperHOC';

type stateData = {
    mobileNo: string;
    mobileCountryCode: string;
    address: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
}

type FormProps = stateData & {
    updateField: (fields: Partial<stateData>) => void
}

export const ContactDetailsForm: React.FC<FormProps> = ({ address, city, country, mobileCountryCode, mobileNo, postalCode, state, updateField }) => {
    return (
        <FormWrapperHOC title="Contact details">
            <div>
                <label htmlFor="mobileNo">Mobile No</label>
                <input type="text" required id="countryCode" onChange={e => updateField({ mobileCountryCode: e.target.value })} value={mobileCountryCode} />
                <input type="text" required id="mobileNo" onChange={e => updateField({ mobileNo: e.target.value })} value={mobileNo} />
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input type="text" required id="address" onChange={e => updateField({ address: e.target.value })} value={address} />
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input type="text" required id="city" onChange={e => updateField({ city: e.target.value })} value={city} />
            </div>
            <div>
                <label htmlFor="state">State</label>
                <input type="text" required id="state" onChange={e => updateField({ state: e.target.value })} value={state} />
            </div>
            <div>
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" required id="postalCode" onChange={e => updateField({ postalCode: e.target.value })} value={postalCode} />
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <select id="country" onChange={e => updateField({ country: e.target.value })} value={country}>
                    <option value="lk">Sri Lanka</option>
                    <option value="us">USA</option>
                    <option value="ca">Canada</option>
                    <option value="uk">United Kingdom</option>
                </select>
            </div>
        </FormWrapperHOC>
    );
}