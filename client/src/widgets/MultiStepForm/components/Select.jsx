import { useState } from "react";
import "../styles/Form.css";

export const Select = ({ name, selected, options, handleChange }) => {
	const [selectedValue, setSelectedValue] = useState(selected);

	const handleClick = (value) => {
		setSelectedValue(value);

		const event = {
			target: {
				name: name,
				value: value,
			},
		};

		if (handleChange) {
			handleChange(event);
		}
	};

	return (
		<div className="select-button-container">
			<input type="hidden" name={name} value={selectedValue} />
			{options.map((option) => (
				<button
					key={option.value}
					className={`select-button ${selectedValue === option.value ? "selected" : ""}`}
					onClick={() => handleClick(option.value)}
					type="button"
				>
					{option.label}
				</button>
			))}
		</div>
	);
};
