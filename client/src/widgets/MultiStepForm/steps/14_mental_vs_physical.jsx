import { Select } from "../components/Select";

const options = [
	{ value: 2, label: "Yes" },
	{ value: 1, label: "Don't know" },
	{ value: 0, label: "No" },
];

export const Step14 = ({ formData, handleChange }) => {
	return (
		<>
			<h1>
				Do you feel that your employer takes mental health as seriously
				as physical health?
			</h1>
			<Select
				name="mental_vs_physical"
				selected={formData?.mental_vs_physical}
				options={options}
				handleChange={handleChange}
			/>
		</>
	);
};
