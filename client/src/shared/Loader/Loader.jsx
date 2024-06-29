const Loader = () => {
	const loaderStyle = {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100vh",
	};

	const spinnerStyle = {
		// border: "16px solid #f3f3f3" /* Light grey */,
		borderTop: "8px solid var(--tg-theme-button-color)" /* Blue */,
		borderRadius: "50%",
		width: "60px",
		height: "60px",
		animation: "spin 0.5s linear infinite",
	};

	return (
		<div style={loaderStyle}>
			<div style={spinnerStyle}></div>
			<style>
				{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
			</style>
		</div>
	);
};

export default Loader;
