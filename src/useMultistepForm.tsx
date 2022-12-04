import { ReactElement, useState } from 'react'

// Custom Hook to handle multi-step forms
export const useMultistepForm = (steps: ReactElement[]) => {
    const [currStepIdx, setCurrStepIdx] = useState(0);

    const nextStep = () => setCurrStepIdx(i => (i >= steps.length - 1) ? i : i + 1);
    const prevStep = () => setCurrStepIdx(i => (i <= 0) ? i : i - 1);
    const goToStep = (stepIdx: number) => setCurrStepIdx(stepIdx);

    return {
        currStepIdx, // Current step index
        step: steps[currStepIdx], // Current step
        nextStep, // Function to go to next step
        prevStep, // Function to go to previous step
        goToStep, // Function to go to a specific step
        isLastStep: currStepIdx === steps.length - 1, // Boolean to check if the current step is the last step
    }
}