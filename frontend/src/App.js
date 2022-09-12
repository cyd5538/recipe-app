import React from "react";
import GlobalStyle from "./style/GlobalStyle";
import { Route, Routes } from "react-router-dom";
import RecipeDetail from "./pages/RecipeDetail";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";

const App = () => {
  return (
    <div>
      <ToastContainer/>
        <GlobalStyle />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<RecipeDetail />} />
          <Route path="/sign" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  );
};

export default App;
