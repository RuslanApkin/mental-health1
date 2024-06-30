import { Select } from "../components/Select";

const options = [
	{ value: 4, label: "Very easy" },
	{ value: 3, label: "Somewhat easy" },
	{ value: 2, label: "Don't know" },
	{ value: 1, label: "Somewhat difficult" },
	{ value: 0, label: "Very difficult" },
];

export const Step10 = ({ formData, handleChange }) => {
	return (
		<>
			<h1>
				How easy is it for you to take medical leave for a mental health
				condition?
			</h1>
			<Select
				name="leave"
				selected={formData?.leave}
				options={options}
				handleChange={handleChange}
			/>
		</>
	);
};
