import { ReactElement, useState } from "react";
import { ExampleComponent } from "./components/ExampleComponent";
import { useMultistepForm } from "./useMultistepForm";

type FormData = {
  fullname: string;
  email: string;
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
};

const App: React.FC = () => {
  const [data, setData] = useState<FormData>(INITIAL_FORM_DATA);
  // Funcion to update the form data
  const updateField = (fields: Partial<FormData>) => setData({ ...data, ...fields });

  // Mutlistep form Array
  const steps: ReactElement[] = [
    <ExampleComponent {...data} updateField={updateField} />,
    <div>Step 2</div>,
    <div>Step 3</div>
  ];

  // Custom hook to handle the multistep form
  const { currStepIdx, step, nextStep, prevStep } = useMultistepForm(steps)

  // Function to handle the form submission
  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('Form submitted');
    nextStep()
  }

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        {currStepIdx + 1}/{steps.length}

        {step}

        {currStepIdx > 0 && <button type="button" onClick={prevStep}>Prev</button>}
        {currStepIdx < steps.length - 1 && <button>Next</button>}
        {/* TODO: Implement conditions for GoTo Button */}
      </form>
    </div>
  );
}

export default App;