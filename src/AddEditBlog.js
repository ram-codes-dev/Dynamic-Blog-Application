import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
export default function AddEditBlog({blogs,setBlogs}) {
  const {id}=useParams(), navigate=useNavigate(), editing=Boolean(id);
  const existing=blogs.find(b=>String(b.id)===String(id));
  const [form,setForm]=useState(existing || {title:"",category:"Technology",author:"Admin",content:"",image:""});
  useEffect(()=>{if(existing)setForm(existing)},[id]);
  const change=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=e=>{
    e.preventDefault();
    if(!form.title.trim() || !form.content.trim()) return alert("Please enter title and content.");
    const item={...form,id:editing?existing.id:Date.now().toString(),date:editing?(existing.date):new Date().toISOString().slice(0,10)};
    setBlogs(editing?blogs.map(b=>String(b.id)===String(id)?item:b):[item,...blogs]);
    navigate("/");
  };
  return <div className="form-card"><h1>{editing?"Edit Article":"Create Article"}</h1>
    <form onSubmit={submit}>
      <label>Title<input name="title" value={form.title} onChange={change} /></label>
      <label>Category<select name="category" value={form.category} onChange={change}><option>Technology</option><option>Lifestyle</option><option>Design</option><option>Business</option></select></label>
      <label>Author<input name="author" value={form.author} onChange={change} /></label>
      <label>Image URL<input name="image" value={form.image} onChange={change} /></label>
      <label>Content<textarea name="content" rows="8" value={form.content} onChange={change} /></label>
      <div className="actions"><button className="button" type="submit">{editing?"Update":"Publish"}</button><Link className="button secondary" to="/">Cancel</Link></div>
    </form>
  </div>
}
