import { useEffect } from "react";
import { useTelegram } from "../../app/hooks/telegram";
import { Forbidden } from "./components/Forbidden";

function Page() {
	const { close, user, ready } = useTelegram();
	console.log("USER", user);

	useEffect(() => {
		ready();
	}, [ready]);

	return (
		<>
			{!user ? (
				<Forbidden />
			) : (
				<>
					<h1>Home</h1>
					<button onClick={close}>Close</button>
				</>
			)}
		</>
	);
}

export default Page;
