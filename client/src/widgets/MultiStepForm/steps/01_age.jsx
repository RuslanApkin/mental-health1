import { Input } from "../components/Input";
import { validateAge } from "../utils/validations";

export const AgeStep = ({
	formData,
	handleChange,
	setIsFormValid,
	setError,
}) => {
	const onChange = (e) => {
		const value = e.target.value;

		if (/^\d*$/.test(value)) {
			handleChange(e);
			validateAge(value, setIsFormValid, setError);
		} else {
			e.preventDefault();
		}
	};

	return (
		<>
			<h1>How old are you?</h1>
			<Input
				name="age"
				value={formData?.age || ""}
				onChange={onChange}
				placeholder="age"
				// type="tel"
				inputMode="numeric"
			/>
		</>
	);
};
