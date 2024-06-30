export const Success = ({ response }) => {
	const probability = response?.data?.probabilities?.at(0)?.at(1);
	let riskLevel;
	let riskEmoji;
	let riskRecommendation;

	if (probability < 0.33) {
		riskLevel = "Low risk of burnout";
		riskEmoji = "🥰";
		riskRecommendation =
			"Keep up the good work! Make sure to maintain a good work-life balance.";
	} else if (probability < 0.67) {
		riskLevel = "Moderate risk of burnout";
		riskEmoji = "😕";
		riskRecommendation =
			"Consider reviewing your workload and taking regular breaks to prevent burnout.";
	} else {
		riskLevel = "High risk of burnout";
		riskEmoji = "🤬";
		riskRecommendation =
			"Immediate action is needed! Consult with your manager and consider seeking professional help.";
	}

	return (
		<div style={{ margin: "0 30px" }}>
			<h1>{riskLevel}</h1>
			<h1>{riskEmoji}</h1>
			<div>
				<h2>{Math.round(probability * 100)}%</h2>
				<span>{riskRecommendation}</span>
			</div>
		</div>
	);
};
