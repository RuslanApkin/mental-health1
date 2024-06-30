import { Select } from "../components/Select";

const options = [
	{ value: 2, label: "Yes" },
	{ value: 0, label: "No" },
	{ value: 1, label: "Skip" },
];

export const Step3 = ({ formData, handleChange }) => {
	return (
		<>
			<h1>Are you self-employed?</h1>
			<Select
				name="self_employed"
				selected={formData?.self_employed}
				options={options}
				handleChange={handleChange}
			/>
		</>
	);
};
