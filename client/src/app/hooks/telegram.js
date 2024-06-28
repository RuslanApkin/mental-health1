export const useTelegram = () => {
	const { initDataUnsafe, close, ready, setHeaderColor } =
		window.Telegram.WebApp;

	setHeaderColor("secondary_bg_color");

	return {
		user: initDataUnsafe?.user,
		ready,
		close,
	};
};
