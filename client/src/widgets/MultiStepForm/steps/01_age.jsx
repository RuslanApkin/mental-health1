export const AgeStep = ({ formData, handleChange, setIsFormValid }) => {
	const onChange = (e) => {
		const num = e.target.value;
		if (!isNaN(num) && num > 0) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}

		handleChange(e);
	};

	return <input name="age" value={formData?.age || ""} onChange={onChange} />;
};
