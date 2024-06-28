import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// import { Status } from "./pages/Status";
import { Form } from "./pages/Form";

function NotFound() {
	return <h1>404</h1>;
}

function App() {
	return (
		<Router>
			<Routes>
				{/* <Route index path="/" element={<Status />} /> */}
				<Route index path="/" element={<Form />} />
				<Route path="/form" element={<Form />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
