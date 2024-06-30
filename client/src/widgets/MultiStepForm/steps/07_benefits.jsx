import { Select } from "../components/Select";

const options = [
	{ value: 2, label: "Yes" },
	{ value: 1, label: "Don't know" },
	{ value: 0, label: "No" },
];

export const Step7 = ({ formData, handleChange }) => {
	return (
		<>
			<h1>Does your employer provide mental health benefits?</h1>
			<Select
				name="benefits"
				selected={formData?.benefits}
				options={options}
				handleChange={handleChange}
			/>
		</>
	);
};
