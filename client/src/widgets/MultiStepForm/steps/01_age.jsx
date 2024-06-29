import { Input } from "../components/Input";

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
			if (value < 0) {
				setIsFormValid(false);
				setError("Indicate your real age");
			} else if (value > 100) {
				setIsFormValid(false);
				setError("Indicate your real age");
			} else if (value < 18) {
				setIsFormValid(false);
				setError("You must be over 18");
			} else {
				setIsFormValid(true);
			}
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
