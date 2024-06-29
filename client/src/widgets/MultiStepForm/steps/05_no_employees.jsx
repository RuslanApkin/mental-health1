import { Select } from "../components/Select";

const options = [
	{ value: 0, label: "1-5" },
	{ value: 1, label: "6-25" },
	{ value: 2, label: "26-100" },
	{ value: 3, label: "100-500" },
	{ value: 4, label: "500-1000" },
	{ value: 5, label: "More than 1000" },
];

export const Step5 = ({ formData, handleChange }) => {
	return (
		<>
			<h1>How many employees does your company or organization have?</h1>
			<Select
				name="no_employees"
				selected={formData?.no_employees}
				options={options}
				handleChange={handleChange}
			/>
		</>
	);
};
