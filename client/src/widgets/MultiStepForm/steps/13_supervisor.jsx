import { Select } from "../components/Select";

const options = [
	{ value: 2, label: "Yes" },
	{ value: 1, label: "Some of them" },
	{ value: 0, label: "No" },
];

export const Step13 = ({ formData, handleChange }) => {
	return (
		<>
			<h1>
				Would you be willing to discuss a mental health issue with your
				direct supervisor(s)?
			</h1>
			<Select
				name="supervisor"
				selected={formData?.supervisor}
				options={options}
				handleChange={handleChange}
			/>
		</>
	);
};
