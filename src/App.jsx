import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import "./App.css";
import Footer from "./pages/Footer";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";

export default function App() {
  const { user } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/register"
            index
            element={user ? <Home /> : <Register />}
          />
          <Route path="/login" index element={user ? <Home /> : <Login />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
