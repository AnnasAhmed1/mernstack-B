import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/home";
import Login from "./screens/login";
import Signup from "./screens/signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  );
}

export default App;
