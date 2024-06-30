import { Select } from "../components/Select";

const options = [
	{ value: 2, label: "Yes" },
	{ value: 1, label: "Maybe" },
	{ value: 0, label: "No" },
];

export const Step11 = ({ formData, handleChange }) => {
	return (
		<>
			<h1>
				Do you think that discussing a mental health issue with your
				employer would have negative consequences?
			</h1>
			<Select
				name="mental_health_consequence"
				selected={formData?.mental_health_consequence}
				options={options}
				handleChange={handleChange}
			/>
		</>
	);
};
