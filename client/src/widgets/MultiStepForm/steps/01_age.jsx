import { Input } from "../components/Input";

export const AgeStep = ({ formData, handleChange, setIsFormValid }) => {
	const onChange = (e) => {
		const value = e.target.value;

		if (/^\d*$/.test(value)) {
			handleChange(e);
			setIsFormValid(value.length > 0);
		} else {
			e.preventDefault();
		}
	};

	return (
		<Input
			name="age"
			value={formData?.age || ""}
			onChange={onChange}
			placeholder="age"
			// type="tel"
			inputMode="numeric"
		/>
	);
};
