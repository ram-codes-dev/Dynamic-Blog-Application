import React, { useMemo, useState } from "react";
import Blogs from "./components/Blogs";
import Search from "./components/Search";
import Category from "./components/Category";
import LatestBlog from "./components/LatestBlog";

const defaults = [
  {id:"1", title:"Getting Started with React", category:"Technology", author:"Admin", date:"2026-08-17", image:"https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80", content:"React makes it easy to build interactive user interfaces with reusable components."},
  {id:"2", title:"10 Tips for Better Productivity", category:"Lifestyle", author:"Admin", date:"2026-08-16", image:"https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80", content:"Small improvements to your daily workflow can produce meaningful long-term results."},
  {id:"3", title:"Understanding Modern Web Design", category:"Design", author:"Admin", date:"2026-08-15", image:"https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80", content:"Good web design combines clarity, accessibility, consistency and performance."}
];

export default function Home({blogs, setBlogs}) {
  const data = blogs.length ? blogs : defaults;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => data.filter(b =>
    (category === "All" || b.category === category) &&
    `${b.title} ${b.content} ${b.author}`.toLowerCase().includes(query.toLowerCase())
  ), [data, query, category]);

  return (
    <div>
      <section className="hero">
        <div>
          <span className="eyebrow">WELCOME TO OUR BLOG</span>
          <h1>Ideas, stories &amp; insights.</h1>
          <p>Discover useful articles, practical tutorials and fresh ideas.</p>
        </div>
      </section>
      <div className="toolbar">
        <Search value={query} onChange={setQuery} />
        <Category value={category} onChange={setCategory} blogs={data} />
      </div>
      <div className="content-grid">
        <section>
          <div className="section-title"><h2>Latest Articles</h2><span>{filtered.length} posts</span></div>
          <Blogs blogs={filtered} setBlogs={setBlogs} />
        </section>
        <LatestBlog blogs={data} />
      </div>
    </div>
  );
}
