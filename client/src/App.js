import { Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<ProtectedRoutes Cmp={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Welcome />} />
        </Route> */}
      </Routes>
    </div>
  );
}

export default App;
