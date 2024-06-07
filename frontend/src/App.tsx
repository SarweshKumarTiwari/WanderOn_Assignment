import Dashboard from "./components/DashBoard";
import LoginPage from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicAuthRoutes from "./components/PublicAuthRoutes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="" element={<ProtectedRoutes />} >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/" element={<PublicAuthRoutes />}>
          <Route index element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
