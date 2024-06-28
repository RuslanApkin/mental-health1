import { Input } from "../components/Input";

export const AgeStep = ({ value }) => {
	return (
		<Input
			title="How old are you?"
			name="age"
			value={value["age"]}
			placeholder="age"
		/>
	);
};
