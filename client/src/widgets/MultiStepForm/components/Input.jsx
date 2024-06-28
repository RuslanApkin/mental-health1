import { ErrorMessage, Field } from "formik";

export const Input = ({ title, name, value, placeholder }) => {
	return (
		<>
			<label htmlFor={name}>{title}</label>
			<Field
				id={name}
				name={name}
				value={value}
				placeholder={placeholder}
			/>
			<ErrorMessage name={name}>
				{(msg) => <div className="error">{msg}</div>}
			</ErrorMessage>
		</>
	);
};
