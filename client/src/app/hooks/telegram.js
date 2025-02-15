export const useTelegram = () => {
	const {
		initDataUnsafe,
		close,
		ready,
		setHeaderColor,
		MainButton,
		BackButton,
		themeParams,
		chat,
		sendData,
	} = window.Telegram.WebApp;

	setHeaderColor("secondary_bg_color");

	return {
		user: initDataUnsafe?.user,
		chat,
		ready,
		close,
		MainButton,
		BackButton,
		themeParams,
		sendData,
	};
};
