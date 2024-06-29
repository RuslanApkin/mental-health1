import { Select } from "../components/Select";

const options = [
	{ value: "male", label: "Male" },
	{ value: "female", label: "Female" },
	{ value: "other", label: "Other" },
];

export const GenderStep = ({ formData, handleChange }) => {
	return (
		<>
			<h1>Select your gender</h1>
			<Select
				name="gender"
				selected={formData?.gender}
				options={options}
				handleChange={handleChange}
			/>
		</>
	);
};
