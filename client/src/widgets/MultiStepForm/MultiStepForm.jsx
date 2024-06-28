import { useEffect, useState } from "react";

import { IntroStep } from "./steps/00_intro";
import { AgeStep } from "./steps/01_age";
import { GenderStep } from "./steps/02_gender";
import { useTelegram } from "../../app/hooks/telegram";

const steps = [IntroStep, AgeStep, GenderStep];

const MultiStepForm = () => {
	const [step, setStep] = useState(1);
	const [isFormValid, setIsFormValid] = useState(true);
	const { MainButton, BackButton } = useTelegram();
	const [formData, setFormData] = useState({
		age: "",
		gender: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	useEffect(() => {
		const handleMainButtonClick = () => {
			if (isFormValid) {
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

		// Возвращаем функцию для удаления обработчиков
		return () => {
			MainButton.offClick(handleMainButtonClick);
			BackButton.offClick(handleBackButtonClick);
		};
	}, [step, isFormValid]); // Указываем все зависимости

	useEffect(() => {
		MainButton.show();
	}, []);

	useEffect(() => {
		if (isFormValid) {
			MainButton.enable();
		} else {
			MainButton.disable();
		}
	}, [isFormValid, MainButton]);

	const isLastStep = step === steps.length - 1;

	useEffect(() => {
		if (step > 0) {
			BackButton.show();
		} else {
			MainButton.enable();
			setIsFormValid(true);
			BackButton.hide();
		}
	}, [step, BackButton]);

	return (
		<>
			<div>{isFormValid ? "ok" : "gg"}</div>
			<div>{step}</div>
			{steps[step]({ formData, handleChange, setIsFormValid })}
		</>
	);
};

export default MultiStepForm;
