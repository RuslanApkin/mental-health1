export const Success = ({ response }) => {
	return (
		<>
			<h1>Susscess</h1>
			<div>{JSON.stringify(response)}</div>
		</>
	);
};
