export const AgeStep = ({ formData, handleChange, setIsFormValid }) => {
	return (
		<input
			name="age"
			value={formData?.age}
			onChange={(e) => {
				console.log("ONCHH", e.target.value);
				if (e.target.value === "123") {
					console.log("TEST");
					setIsFormValid(false);
				} else {
					setIsFormValid(true);
				}
				handleChange(e);
			}}
		/>
	);
};
