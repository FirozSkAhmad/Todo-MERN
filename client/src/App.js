import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute, ProtectedRouteIn } from "./components/ProtectedRoutes";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProtectedRoute Cmp={Home} />} />
        <Route path="/login" element={<ProtectedRouteIn Cmp={Login} />} />
        <Route path="/register" element={<ProtectedRouteIn Cmp={Register} />} />
      </Routes>
    </div>
  );
}

export default App;
