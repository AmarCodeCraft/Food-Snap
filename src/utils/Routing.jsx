import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import UploadSnap from "../pages/UploadSnap";
import Gallery from "../pages/Gallery";
import Blog from "../pages/Blog";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/UploadSnap" element={<UploadSnap />} />
      <Route path="/Gallery" element={<Gallery />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
  );
}

export default Routing;
