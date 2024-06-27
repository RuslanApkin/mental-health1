import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function Home() {
	return <h1>Home</h1>;
}

function FormPage() {
	return <h1>Form</h1>;
}

function NotFound() {
	return <h1>404</h1>;
}

function App() {
	return (
		<Router>
			<Routes>
				<Route index path="/" element={<Home />} />
				<Route path="/form" element={<FormPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
