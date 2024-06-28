import { Select } from "../components/Select";

export const GenderStep = () => {
	return (
		<Select
			label="Gender"
			options={[
				{ value: "male", label: "Male" },
				{ value: "female", label: "Female" },
				{ value: "other", label: "Other" },
			]}
			name="gender"
		/>
	);
};
