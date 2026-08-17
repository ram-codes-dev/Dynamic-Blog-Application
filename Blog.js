import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  MDBContainer,
  MDBTypography,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBSpinner,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/blogs/${id}`);
        if (res.status === 200) {
          setBlog(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching blog", err);
      }
    };

    fetchBlog();
  }, [id]);

  // Fetch related blogs
  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/blogs");
        if (res.status === 200) {
          const filtered = res.data.filter(
            (b) => b.category === blog.category && b.id !== blog.id
          );
          setRelatedBlogs(filtered);
        }
      } catch (err) {
        console.error("Error fetching related blogs", err);
      }
    };

    if (blog.category) {
      fetchRelatedBlogs();
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <MDBSpinner role="status" />
      </div>
    );
  }

  return (
    <MDBContainer className="blog-page-container py-5 px-3">
      <Link to="/" className="blog-back-link">← Back to Home</Link>

       <MDBCard className="blog-full-card"style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}>
        <MDBCardImage
          src={blog.imageUrl}
          alt={blog.title}
          position="top"
          className="blog-full-image"
        />
        <MDBCardBody>
          <span className="blog-full-category">{blog.category}</span>
          <MDBTypography tag="h2" className="blog-full-title">
            {blog.title}
          </MDBTypography>
          <MDBCardText className="blog-full-content" style={{ color: "var(--text-color)" }}>
            {blog.description}
          </MDBCardText>
          <p className="blog-full-date">
            Posted on: <strong>{blog.date}</strong>
          </p>
        </MDBCardBody>
      </MDBCard>

      {relatedBlogs.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-4">Related Posts</h4>
          <MDBRow className="related-posts">
            {relatedBlogs.map((item) => (
              <MDBCol md="4" key={item.id} className="mb-4">
                <MDBCard className="blog-card" style={{ backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}>
                  <MDBCardImage
                    src={item.imageUrl}
                    alt={item.title}
                    position="top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <MDBCardBody>
                    <MDBCardTitle className="blog-title">{item.title}</MDBCardTitle>
                    <MDBCardText className="blog-description">
                      {item.description?.substring(0, 60)}...
                    </MDBCardText>
                    <Link to={`/blog/${item.id}`} className="read-more-btn">Read More</Link>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </div>
      )}
    </MDBContainer>
  );
};

export default Blog;
