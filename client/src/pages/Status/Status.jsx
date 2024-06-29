import "./Status.css";
import { useEffect } from "react";
import { useTelegram } from "../../app/hooks/telegram";
import { Canvas } from "./components/Canvas";
import { FrostedGlass } from "./components/FrostedGlass/FrostedGlass";

function Page() {
	const { MainButton, close } = useTelegram();

	useEffect(() => {
		MainButton.show().setParams({ text: "Ok" });
		MainButton.onClick(() => {
			close();
		});
	}, [MainButton, close]);

	return (
		<>
			<Canvas />
			<FrostedGlass />
			<div className="status-container">
				<h1>Your status</h1>
			</div>
		</>
	);
}

export default Page;
