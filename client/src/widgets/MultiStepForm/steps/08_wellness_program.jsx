import { Select } from "../components/Select";

const options = [
	{ value: 2, label: "Yes" },
	{ value: 1, label: "Don't know" },
	{ value: 0, label: "No" },
];

export const Step8 = ({ formData, handleChange }) => {
	return (
		<>
			<h1>
				Has your employer ever discussed mental health as part of an
				employee wellness program?
			</h1>
			<Select
				name="wellness_program"
				selected={formData?.wellness_program}
				options={options}
				handleChange={handleChange}
			/>
		</>
	);
};
