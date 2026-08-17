import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Home";
import Blog from "./Blog";
import AddEditBlog from "./AddEditBlog";
import About from "./About";
import NotFound from "./NotFound";

export default function App() {
  const [blogs, setBlogs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("blogs")) || []; }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  return (
    <>
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/blog/:id" element={<Blog blogs={blogs} />} />
          <Route path="/add" element={<AddEditBlog blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/edit/:id" element={<AddEditBlog blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
