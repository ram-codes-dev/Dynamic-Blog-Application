import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBTypography,
  MDBIcon
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import Blogs from "../components/Blogs";
import Search from "../components/Search";
import Category from "../components/Category";
import LatestBlog from "../components/LatestBlog";
import Pagination from "../components/Pagination";

const Home = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(6);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";

  const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech", "Others"];

  useEffect(() => {
    fetchAllBlogs();
    fetchLatestBlog();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, selectedCategory]);

  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs");
      if (response.status === 200) {
        setAllBlogs(response.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to fetch blogs");
    }
  };

  const fetchLatestBlog = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs");
      if (response.status === 200) {
        const latest = response.data.slice(-3).reverse();
        setLatestBlog(latest);
      }
    } catch (error) {
      toast.error("Failed to fetch latest blogs");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you wanted to delete that blog?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
        if (response.status === 200) {
          toast.success("Blog Deleted Successfully");
          fetchAllBlogs();
          fetchLatestBlog();
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Error deleting blog");
        console.error(error);
      }
    }
  };

  const handleCategory = (category) => {
    setSearchParams({ search: searchQuery, category });
  };

  const excerpt = (str) => {
    if (str.length > 50) {
      return str.substring(0, 50) + "...";
    }
    return str;
  };

  const filteredBlogs = allBlogs.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || item.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const paginatedBlogs = filteredBlogs.slice(
    currentPage * pageLimit,
    (currentPage + 1) * pageLimit
  );

  return (
    <>
      <Search searchQuery={searchQuery} setSearchQuery={(value) => setSearchParams({ search: value, category: selectedCategory })} />

      <MDBContainer fluid className="mt-4 px-3">
        <MDBRow>
          <MDBCol md="9">
           {filteredBlogs.length === 0 ? (
                 <div className="no-blog-found">
                    <div className="no-blog-inner">
                      <MDBIcon
                        icon="exclamation-circle"
                        fas
                        size="3x"
                        className="text-warning mb-3"
                      />
                      <MDBTypography tag="h2" className="fade-slide">
                        No Blog Found
                      </MDBTypography>
                      <p className="text-muted">Try adjusting your search or category filter.</p>
                    </div>
                  </div>
                ) : (
              <>
                <MDBRow className="g-4 mt-3">
                  {paginatedBlogs.map((item, index) => (
                    <MDBCol lg="4" md="6" sm="12" className="d-flex" key={index}>
                      <div className="w-100">
                        <Blogs
                          {...item}
                          excerpt={excerpt}
                          handleDelete={handleDelete}
                        />
                      </div>
                    </MDBCol>
                  ))}
                </MDBRow>

                {filteredBlogs.length > pageLimit && (
                  <Pagination
                    currentPage={currentPage}
                    pageLimit={pageLimit}
                    totalBlog={filteredBlogs.length}
                    loadBlogsData={(start, end, inc) =>
                      setCurrentPage(currentPage + inc)
                    }
                  />
                )}
              </>
            )}
          </MDBCol>

          <MDBCol md="3" className="latest-blogs-column">
            <h5 className="mt-2 mb-3 text-start">Latest Blogs 🆕</h5>
            {latestBlog.map((item) => (
              <LatestBlog
                key={item.id}
                id={item.id}
                title={item.title}
                imageUrl={item.imageUrl}
                category={item.category}
              />
            ))}

            <h5 className="mt-4 mb-2 text-start">Categories 📚</h5>
            <Category options={options} handleCategory={handleCategory} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Home;
