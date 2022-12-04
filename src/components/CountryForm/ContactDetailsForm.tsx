import { FormWrapperHOC } from '../../FormWrapperHOC';
import ReactSelect from "react-select";
import { fetchCountries, fetchCountryCode } from './api';
import { useState, useEffect, useRef } from 'react';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

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
    const phoneRef = useRef<HTMLInputElement>()
    const initPhoneInput = () => {
        return intlTelInput(phoneRef.current!, {
            separateDialCode: true,
            placeholderNumberType: "PERSONAL_NUMBER"
        });
    }
    useEffect(() => {
        fetchCountries().then(res => setCountryList(res))
        initPhoneInput()

        // return () => {
        //     phoneRef.current!.remove()
        //     initPhoneInput().destroy()
        // }
    }, [])

    // TODO: Fix the issue with the phone number input
    const handleCountryChange = (e: any) => {
        updateField({ country: e.value })
        const pi = initPhoneInput()
        pi.setCountry(e.value)
        setCountryCode(pi.getSelectedCountryData().dialCode)
    }


    return (
        <FormWrapperHOC title="Contact details">
            <div className='contact_form'>
                <label htmlFor="country">Country</label>
                <ReactSelect
                    required
                    options={countryList}
                    value={countryList.find(option => option.value == country) || null}
                    onChange={handleCountryChange}
                />
            </div>

            <div>
                <label htmlFor="postalCode">Postal Code</label>
                <input type="text" required id="postalCode" onChange={e => updateField({ postalCode: e.target.value })} value={postalCode} />
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

            <div className='country_code'>
                {/* <img src={countryCode.flag} alt="flag" className='flag-img' /> */}
                {/* <span>{countryCode.code}</span> */}
                <input type="tel" ref={phoneRef} required placeholder='Phone No.' onChange={e => updateField({ mobileNo: e.target.value })} value={mobileNo} />
            </div>
        </FormWrapperHOC >
    );
}