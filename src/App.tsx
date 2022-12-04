import { ReactElement, useState } from "react";
import { ContactDetailsForm } from "./components/ContactForm/ContactDetailsForm";
import { AccountDetailsForm } from "./components/AccountDetailsForm";
import { ExampleComponent } from "./components/ExampleComponent";
import { UserForm } from "./components/UserForm";
import { useMultistepForm } from "./useMultistepForm";
import { VerifyEmail } from "./components/VerifyEmail";

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
  // TODO: Add a function to validate the form data and refactor this messy code
  const dataIsValid = () => {
    if (currStepIdx === 0) { // UserForm
      return data.fullname && data.age && data.gender
    }
    if (currStepIdx === 1) { // ContactDetailsForm
      return data.address && data.city && data.postalCode && data.country && data.mobileNo && data.mobileCountryCode
    }
    if (currStepIdx === 2) { // AccountDetailsForm
      return data.email && data.password
    }
  }
  // Mutlistep form Array
  const steps: ReactElement[] = [
    // <ExampleComponent {...data} updateField={updateField} />,
    <UserForm {...data} updateField={updateField} />,
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
    if (dataIsValid()) {
      nextStep();
    }
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