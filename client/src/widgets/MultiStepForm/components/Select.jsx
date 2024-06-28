import { ErrorMessage, Field, useField } from "formik";

export const Select = ({ label, options, name }) => {
	const [field, meta, helpers] = useField(name);
	console.log("META", name, meta);

	return (
		<div className="form-control">
			<label>{label}</label>
			<div className="button-group">
				{options.map((option) => (
					<button
						type="button"
						key={option.value}
						className={`button-option ${field.value === option.value ? "selected" : ""}`}
						onClick={() => helpers.setValue(option.value)}
					>
						{option.label}
					</button>
				))}
			</div>
			<Field type="hidden" name={name} />
			<ErrorMessage name="favoriteColor">
				{(msg) => <div className="error">{msg}</div>}
			</ErrorMessage>
		</div>
	);
};
