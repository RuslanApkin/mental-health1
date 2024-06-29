import "./ProgressBar.css";

const ProgressBar = ({ value, max }) => {
	// Ограничим значение value в пределах 0 и max
	const cappedValue = Math.max(0, Math.min(value, max));
	// Рассчет процента заполнения
	const percentage = (cappedValue / max) * 100;

	return (
		<div className="progress-bar">
			<div
				className="progress-bar__fill"
				style={{ width: `${percentage}%` }}
			/>
		</div>
	);
};

export default ProgressBar;
