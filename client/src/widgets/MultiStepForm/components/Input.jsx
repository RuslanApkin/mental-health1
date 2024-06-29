import "../styles/Form.css";

export const Input = ({ name, value, onChange, placeholder }) => {
	return (
		<div className="input-container">
			<input
				type="text"
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</div>
	);
};
