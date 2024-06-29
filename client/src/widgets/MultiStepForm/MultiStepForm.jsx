import { useEffect, useState } from "react";

import { IntroStep } from "./steps/00_intro";
import { AgeStep } from "./steps/01_age";
import { GenderStep } from "./steps/02_gender";
import { useTelegram } from "../../app/hooks/telegram";
import { Outro } from "./steps/99_outro";
import ProgressBar from "./components/ProgressBar";

const steps = [IntroStep, AgeStep, GenderStep, Outro];

const MultiStepForm = () => {
	const [step, setStep] = useState(0);
	const [isFormValid, setIsFormValid] = useState(true);
	const { MainButton, BackButton, close } = useTelegram();
	const [formData, setFormData] = useState({
		age: "",
		gender: "male",
	});

	useEffect(() => {
		if (!formData.age) {
			setIsFormValid(false);
		}
	}, [formData, step]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	useEffect(() => {
		const handleMainButtonClick = () => {
			const isLastStep = step === steps.length - 1;
			if (isLastStep) {
				close();
			} else if (isFormValid) {
				setStep((prev) => prev + 1);
			}
		};

		const handleBackButtonClick = () => {
			if (step > 0) {
				setStep((prev) => prev - 1);
			}
		};

		MainButton.onClick(handleMainButtonClick);
		BackButton.onClick(handleBackButtonClick);

		return () => {
			MainButton.offClick(handleMainButtonClick);
			BackButton.offClick(handleBackButtonClick);
		};
	}, [step, isFormValid, MainButton, BackButton, close]);

	useEffect(() => {
		MainButton.show();
	}, []);

	useEffect(() => {
		if (isFormValid) {
			MainButton.enable().setParams({
				text: "Next",
				color: "#2481CC",
			});
		} else {
			MainButton.disable().setParams({
				text: "Incorrect",
				color: "#FFA500",
			});
		}
	}, [isFormValid, MainButton]);

	useEffect(() => {
		const isLastStep = step === steps.length - 1;
		if (isLastStep) {
			MainButton.setParams({ text: "Submit", color: "#28A745" });
		} else {
			MainButton.setParams({ text: "Next", color: "#2481CC" });
		}
		if (step > 0) {
			BackButton.show();
		} else {
			MainButton.enable();
			setIsFormValid(true);
			BackButton.hide();
		}
	}, [step, MainButton, BackButton]);

	return (
		<>
			<ProgressBar value={step} max={steps.length - 1} />
			{steps[step]({ formData, handleChange, setIsFormValid })}
		</>
	);
};

export default MultiStepForm;
