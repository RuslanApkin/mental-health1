import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Status } from "./pages/Status";
import { Form } from "./pages/Form";
import { Telegram } from "./layout/Telegram";

function NotFound() {
	return <h1>404</h1>;
}

function App() {
	return (
		<Router>
			<Routes>
				<Route
					index
					path="/"
					element={
						<Telegram>
							<Status />
						</Telegram>
					}
				/>
				<Route
					path="/form"
					element={
						<Telegram>
							<Form />
						</Telegram>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
