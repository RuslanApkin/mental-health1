import "../styles/Form.css";

export const Select = ({ name, selected, options, handleChange }) => {
	const handleClick = (value) => {
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
			<input type="hidden" name={name} value={selected} />
			{options.map((option) => (
				<button
					key={option.value}
					className={`select-button ${selected === option.value ? "selected" : ""}`}
					onClick={() => handleClick(option.value)}
					type="button"
				>
					{option.label}
				</button>
			))}
		</div>
	);
};
