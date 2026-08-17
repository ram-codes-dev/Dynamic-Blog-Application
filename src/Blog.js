import React from "react";
import { Link, useParams } from "react-router-dom";
export default function Blog({blogs}) {
  const {id} = useParams();
  const defaults = [
    {id:"1", title:"Getting Started with React", category:"Technology", author:"Admin", date:"2026-08-17", content:"React makes it easy to build interactive user interfaces with reusable components."},
    {id:"2", title:"10 Tips for Better Productivity", category:"Lifestyle", author:"Admin", date:"2026-08-16", content:"Small improvements to your daily workflow can produce meaningful long-term results."},
    {id:"3", title:"Understanding Modern Web Design", category:"Design", author:"Admin", date:"2026-08-15", content:"Good web design combines clarity, accessibility, consistency and performance."}
  ];
  const blog = (blogs.length ? blogs : defaults).find(b => String(b.id) === String(id));
  if (!blog) return <div className="empty"><h2>Blog not found</h2><Link to="/">Back Home</Link></div>;
  return <article className="article">
    <span className="tag">{blog.category}</span><h1>{blog.title}</h1>
    <p className="meta">By {blog.author || "Admin"} · {blog.date || "Today"}</p>
    {blog.image && <img src={blog.image} alt={blog.title} />}
    <p>{blog.content}</p>
    <Link className="button secondary" to="/">← Back to articles</Link>
  </article>;
}
