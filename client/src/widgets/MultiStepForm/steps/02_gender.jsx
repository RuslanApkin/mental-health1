import { Select } from "../components/Select";

const options = [
	{ value: 0, label: "Male" },
	{ value: 2, label: "Female" },
	{ value: 1, label: "Other" },
];

export const Step2 = ({ formData, handleChange }) => {
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
