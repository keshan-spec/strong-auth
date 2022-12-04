import { ReactElement, useState } from "react";
import { ContactDetailsForm } from "./components/CountryForm/ContactDetailsForm";
import { AccountDetailsForm } from "./components/AccountDetailsForm";
import { UserForm } from "./components/UserForm";
import { useMultistepForm } from "./useMultistepForm";
// import { ExampleComponent } from "./components/ExampleComponent";
// import { VerifyEmail } from "./components/VerifyEmail";

import './sass/forms.css'


type FormData = {
  fullname: string;
  email: string;
  age: number;
  gender: string;
  password: string;
  mobileNo: string;
  mobileCountryCode: string;
  address: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
};

const INITIAL_FORM_DATA: FormData = {
  fullname: "",
  email: "",
  password: "",
  mobileNo: "",
  mobileCountryCode: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  age: 0,
  gender: "",
};

const App: React.FC = () => {
  const [data, setData] = useState<FormData>(INITIAL_FORM_DATA);
  // Funcion to update the form data
  const updateField = (fields: Partial<FormData>) => setData({ ...data, ...fields });

  // Mutlistep form Array
  const steps: ReactElement[] = [
    // <ExampleComponent {...data} updateField={updateField} />,
    // <UserForm {...data} updateField={updateField} />,
    <ContactDetailsForm {...data} updateField={updateField} />,
    <AccountDetailsForm {...data} updateField={updateField} />,
  ];

  // Custom hook to handle the multistep form
  const { currStepIdx, step, nextStep, prevStep, isLastStep } = useMultistepForm(steps)

  // Function to handle the form submission
  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('Form submitted');
    if (isLastStep) {
      console.log('Form submitted');
      console.log(data);
    }
    nextStep()
  }

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        {currStepIdx + 1}/{steps.length}
        {step}
        {currStepIdx > 0 && <button type="button" onClick={prevStep}>Prev</button>}
        <button type="submit">{isLastStep ? "Create Account" : "Next"}</button>
        {/* TODO: Implement conditions for GoTo Button */}
      </form>
    </div>
  );
}

export default App;