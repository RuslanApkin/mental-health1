import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { IntroStep } from "./steps/00_intro";
import { AgeStep } from "./steps/01_age";
import { GenderStep } from "./steps/02_gender";
import { useTelegram } from "../../app/hooks/telegram";

const steps = [IntroStep, AgeStep, GenderStep];

const MultiStepForm = () => {
	const [step, setStep] = useState(1);
	const [isFormValid, setIsFormValid] = useState(true);
	const { MainButton, BackButton } = useTelegram();

	const FormObserver = ({ isValid }) => {
		useEffect(() => {
			setIsFormValid(isValid);
		}, [isValid]);

		return null;
	};

	MainButton.show();
	MainButton.onClick(() => {
		if (isFormValid) {
			setStep(step + 1);
		}
	});

	BackButton.onClick(() => {
		if (step > 0) {
			setStep(step - 1);
		}
	});

	useEffect(() => {
		console.log("AAAAA", isFormValid);
		if (isFormValid) {
			window.Telegram.WebApp.setHeaderColor("#00FF00");
			MainButton.enable();
		} else {
			window.Telegram.WebApp.setHeaderColor("#FF0000");
			MainButton.disable();
		}
	}, [isFormValid, MainButton]);

	const isLastStep = step === steps.length - 1;

	useEffect(() => {
		if (step > 0) {
			BackButton.show();
		} else {
			BackButton.hide();
		}
	}, [step, BackButton]);

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
			validateOnMount
			validateOnChange
		>
			{(state) => {
				<FormObserver isValid={state.isValid} />;

				return (
					<>
						<div>{step}</div>
						<Form>{steps[step]({ value: state.values })}</Form>
					</>
				);
			}}
		</Formik>
	);
};

export default MultiStepForm;
