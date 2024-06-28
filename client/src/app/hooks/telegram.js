export const useTelegram = () => {
	const { initDataUnsafe, close, ready } = window.Telegram.WebApp;

	return {
		user: initDataUnsafe?.user,
		ready,
		close,
	};
};
