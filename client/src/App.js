// import logo from "./logo.svg";
import "./App.css";
import Mainpage from "./mainPage";
import from
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Mainpage/>} />
			<Route path="/login" element={<Login/>} />
		</Routes>
	</BrowserRouter>
      
    </div>
  );
}

export default App;
