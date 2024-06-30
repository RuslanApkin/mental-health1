import { Select } from "../components/Select";

const options = [
	{ value: 2, label: "Yes" },
	{ value: 0, label: "No" },
];

export const Step6 = ({ formData, handleChange }) => {
	return (
		<>
			<h1>
				Do you work remotely (outside of an office) at least 50% of the
				time?
			</h1>
			<Select
				name="remote_work"
				selected={formData?.remote_work}
				options={options}
				handleChange={handleChange}
			/>
		</>
	);
};
