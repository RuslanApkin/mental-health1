import { Select } from "../components/Select";

const options = [
	{ value: 2, label: "Yes" },
	{ value: 1, label: "Some of them" },
	{ value: 0, label: "No" },
];

export const Step12 = ({ formData, handleChange }) => {
	return (
		<>
			<h1>
				Would you be willing to discuss a mental health issue with your
				coworkers?
			</h1>
			<Select
				name="coworkers"
				selected={formData?.coworkers}
				options={options}
				handleChange={handleChange}
			/>
		</>
	);
};
