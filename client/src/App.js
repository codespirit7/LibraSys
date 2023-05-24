// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import AdminLogin from "./components/adminLogin/AdminLogin";
import AdminRegister from "./components/adminRegister/AdminRegister";
import AddBooks from "./components/addBooks/AddBooks";
import Search from "./components/search/Search";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="home" element={<Home />} />

        <Route path="login" element={<Login />} />

        <Route path="register" element={<Register />} />

        <Route path="addBooks" element={<AddBooks />} />

        <Route path="adminLogin" element={<AdminLogin />} />

        <Route path="adminRegister" element={<AdminRegister />} />

        <Route path="search" element={<Search />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
