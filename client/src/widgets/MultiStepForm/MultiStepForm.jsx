import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { IntroStep } from "./steps/00_intro";
import { AgeStep } from "./steps/01_age";
import { GenderStep } from "./steps/02_gender";

const steps = [IntroStep, AgeStep, GenderStep];

const MultiStepForm = () => {
	const [step, setStep] = useState(0);

	const handleNext = () => setStep(step + 1);
	const handleBack = () => setStep(step - 1);

	const isLastStep = step === steps.length - 1;

	return (
		<Formik
			initialValues={{
				age: "",
				gender: "female",
				self_employed: false,
			}}
			validationSchema={Yup.object({
				age: step === 1 && Yup.number().required("Required"),
				gender: step === 2 && Yup.string().required("Required"),
			})}
			onSubmit={(values) => {
				if (isLastStep) {
					alert(JSON.stringify(values, null, 2));
				} else {
					handleNext();
				}
			}}
		>
			{(state) => {
				console.log("FORKMIK STATE:", state);
				return (
					<Form>
						{steps[step]({ value: state.values?.age })}
						<div>
							{step > 0 && (
								<button type="button" onClick={handleBack}>
									Back
								</button>
							)}
							<button type="submit">
								{isLastStep ? "Submit" : "Next"}
							</button>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default MultiStepForm;
