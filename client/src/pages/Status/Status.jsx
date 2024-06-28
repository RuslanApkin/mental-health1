import { useEffect } from "react";
import { useTelegram } from "../../app/hooks/telegram";

function Page() {
	const { close, user, ready } = useTelegram();
	console.log("USER", user);

	useEffect(() => {
		ready();
	}, [ready]);

	return (
		<div>
			<h1>Home</h1>
			<button onClick={close}>Close</button>
		</div>
	);
}

export default Page;
