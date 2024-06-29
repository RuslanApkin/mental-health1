import "./Status.css";
import { useEffect } from "react";
import { useTelegram } from "../../app/hooks/telegram";
import { Canvas } from "./components/Canvas";
import { FrostedGlass } from "./components/FrostedGlass/FrostedGlass";
import { useState } from "react";
import { Loader } from "../../shared/Loader";

function Page() {
	const { MainButton, close, chat } = useTelegram();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [status, setStatus] = useState();

	useEffect(() => {
		MainButton.show().setParams({ text: "Ok" });
		MainButton.onClick(() => {
			close();
		});
	}, [MainButton, close]);

	useEffect(() => {
		setLoading(true);
		fetch(`${import.meta.env.VITE_BACKEND_URL}/emotions/${chat?.id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw new Error(`Error: ${response.status}`);
				}
			})
			.then((data) => {
				setLoading(false);
				setError("");
				setStatus(data);
				console.log(data);
			})
			.catch((error) => {
				setLoading(false);
				setError(error.message);
				console.error(error.message);
			});
	}, [chat]);

	return (
		<>
			{loading ? (
				<Loader />
			) : error ? (
				<h1>Internal server error</h1>
			) : (
				<>
					<Canvas />
					<FrostedGlass />
					<div className="status-container">
						<h1>Your status {JSON.stringify(status)}</h1>
					</div>
				</>
			)}
		</>
	);
}

export default Page;
