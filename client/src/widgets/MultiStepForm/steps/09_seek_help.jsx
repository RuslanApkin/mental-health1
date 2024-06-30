import { Select } from "../components/Select";

const options = [
	{ value: 2, label: "Yes" },
	{ value: 1, label: "Don't know" },
	{ value: 0, label: "No" },
];

export const Step9 = ({ formData, handleChange }) => {
	return (
		<>
			<h1>
				Does your employer provide resources to learn more about mental
				health issues and how to seek help?
			</h1>
			<Select
				name="seek_help"
				selected={formData?.seek_help}
				options={options}
				handleChange={handleChange}
			/>
		</>
	);
};
