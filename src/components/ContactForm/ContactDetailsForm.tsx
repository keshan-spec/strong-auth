import { FormWrapperHOC } from '../../FormWrapperHOC';
import ReactSelect from "react-select";
import { useState, useEffect } from 'react';
import { fetchCountries, fetchCountryCode } from './api';


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

type Country = {
    label: string;
    value: string;
}

type APIResponse = {
    countries: Country[];
}

export const ContactDetailsForm: React.FC<FormProps> = ({ address, city, country, mobileCountryCode, mobileNo, postalCode, state, updateField }) => {
    const [countryList, setCountryList] = useState<APIResponse[]>([])
    const [countryCode, setCountryCode] = useState('')

    useEffect(() => {
        fetchCountries().then(res => setCountryList(res))

    }, [])
    const handleCountryChange = (e: any) => {
        updateField({ country: e.value })
        fetchCountryCode(e.value).then(res => setCountryCode(res.code))
    }

    return (
        <FormWrapperHOC title="Contact details">
            <div>
                <label >Country</label>
                <ReactSelect
                    required
                    options={countryList}
                    value={countryList.find(option => option.value == country) || null}
                    onChange={handleCountryChange}
                />
            </div>
            <div>
                <label htmlFor="mobileNo">Mobile No</label>
                {/* <input type="text" required id="countryCode" onChange={e => updateField({ mobileCountryCode: e.target.value })} value={mobileCountryCode} /> */}
                <input type="text" required id="mobileNo" onChange={e => updateField({ mobileNo: e.target.value })} value={mobileNo} />
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input type="text" required id="address" onChange={e => updateField({ address: e.target.value })} value={address} />
            </div>
            <div className='sub-grid'>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" required id="city" onChange={e => updateField({ city: e.target.value })} value={city} />
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" onChange={e => updateField({ state: e.target.value })} value={state} />
                </div>
            </div>
            <div>
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" required id="postalCode" onChange={e => updateField({ postalCode: e.target.value })} value={postalCode} />
            </div>

        </FormWrapperHOC>
    );
}