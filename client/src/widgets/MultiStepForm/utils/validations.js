export const validateAge = (age, setIsFormValid, setError) => {
	if (!age) {
		setIsFormValid(false);
		setError("Age is required");
	} else if (age < 0) {
		setIsFormValid(false);
		setError("Indicate your real age");
	} else if (age > 100) {
		setIsFormValid(false);
		setError("Indicate your real age");
	} else if (age < 18) {
		setIsFormValid(false);
		setError("You must be over 18");
	} else {
		setIsFormValid(true);
	}
};
