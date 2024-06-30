import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { Status } from "./pages/Status";
import { Form } from "./pages/Form";
import { Telegram } from "./layout/Telegram";
import { NotFound } from "./pages/NotFound";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					index
					path="/"
					element={
						<Telegram>
							<Form />
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
