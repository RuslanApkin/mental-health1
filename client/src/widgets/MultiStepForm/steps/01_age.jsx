import { Input } from "../components/Input";

export const AgeStep = ({ formData, handleChange, setIsFormValid }) => {
	const onChange = (e) => {
		const num = e.target.value;
		if (!isNaN(num) && num > 0) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}

		handleChange(e);
	};

	return (
		<Input
			name="age"
			value={formData?.age || ""}
			onChange={onChange}
			placeholder="age"
		/>
	);
};
