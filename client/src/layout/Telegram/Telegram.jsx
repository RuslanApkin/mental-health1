import { useEffect } from "react";
import { useTelegram } from "../../app/hooks/telegram";
import { Forbidden } from "../../pages/Status/components/Forbidden";

export const Telegram = ({ children }) => {
	const { ready, user } = useTelegram();

	useEffect(() => {
		ready();
	}, [ready]);

	return <>{!user ? <Forbidden /> : children}</>;
};
