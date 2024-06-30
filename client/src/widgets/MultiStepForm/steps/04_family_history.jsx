import { Select } from "../components/Select";

const options = [
	{ value: 2, label: "Yes" },
	{ value: 0, label: "No" },
];

export const Step4 = ({ formData, handleChange }) => {
	return (
		<>
			<h1>Do you have a family history of mental illness?</h1>
			<Select
				name="family_history"
				selected={formData?.family_history}
				options={options}
				handleChange={handleChange}
			/>
		</>
	);
};
