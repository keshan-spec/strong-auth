import { ReactElement } from "react";
import { useMultistepForm } from "./useMultiStepForm";

const App: React.FC = () => {
  const steps: ReactElement[] = [
    <div>Step 1</div>,
    <div>Step 2</div>,
    <div>Step 3</div>
  ];
  const { currStepIdx, step, nextStep, prevStep, goToStep } = useMultistepForm(steps)
  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('Form submitted');
  }

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        {currStepIdx + 1}/{steps.length}

        {step}

        {currStepIdx > 0 && <button onClick={prevStep}>Prev</button>}
        {currStepIdx < steps.length - 1 && <button onClick={nextStep}>Next</button>}
        {/* TODO: Implement conditions for GoTo Button */}
      </form>
    </div>
  );
}

export default App;