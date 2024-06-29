import { useTelegram } from "../../../app/hooks/telegram";

export const IntroStep = () => {
	const { user } = useTelegram();

	return (
		<>
			<h1>Hello, {user?.first_name || user?.username || "Friend"}!</h1>
			<span>Take a short test to assess your emotional state</span>
		</>
	);
};
