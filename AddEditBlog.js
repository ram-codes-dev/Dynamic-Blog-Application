import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBTextArea,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  category: "",
  description: "",
  imageUrl: "",
};

const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech", "others"];

const AddEditBlog = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErrMsg, setCategoryErrMsg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { title, description, category, imageUrl } = formValue;

  useEffect(() => {
    if (id) {
      setEditMode(true);
      getSingleBlog(id);
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    try {
      const singleBlog = await axios.get(`http://localhost:5000/blogs/${id}`);
      if (singleBlog.status === 200) {
        setFormValue({ ...singleBlog.data });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Failed to fetch blog:", error);
      toast.error("Failed to load blog");
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onUploadImage = (file) => {
    setUploading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vvaadd");

    axios
      .post("https://api.cloudinary.com/v1_1/dxyym6z4s/image/upload", formData)
      .then((resp) => {
        if (resp.data?.secure_url) {
          setFormValue((prev) => ({ ...prev, imageUrl: resp.data.secure_url }));
          setUploadSuccess(true);
          toast.success("Image uploaded successfully");
        }
      })
      .catch((err) => {
        console.error("Image upload error:", err);
        toast.error("Image upload failed");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const onCategoryChange = (e) => {
    setFormValue({ ...formValue, category: e.target.value });
  };

  const getDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    return mm + "/" + dd + "/" + yyyy;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      setCategoryErrMsg("Please select a category");
      return;
    }

    const imageValidation = editMode ? true : imageUrl;

    if (title && description && imageValidation && category) {
      const currentDate = getDate();
      const updatedBlogData = {
        ...formValue,
        date: currentDate,
      };

      try {
        let response;
        if (editMode) {
          response = await axios.put(`http://localhost:5000/blogs/${id}`, updatedBlogData);
          if (response.status === 200) {
            toast.success("Blog Updated Successfully");
          } else {
            toast.error("Something went wrong");
          }
        } else {
          response = await axios.post("http://localhost:5000/blogs", updatedBlogData);
          if (response.status === 201) {
            toast.success("Blog Created Successfully");
          } else {
            toast.error("Something went wrong");
          }
        }

        setFormValue(initialState);
        setUploadSuccess(false);
        navigate("/");
      } catch (error) {
        console.error("Error submitting blog:", error);
        toast.error("Server error occurred");
      }
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "var(--bg)" }}>
      <div
        className="p-4 rounded shadow"
        style={{ width: "100%", maxWidth: "500px", marginTop: "30px", backgroundColor: "var(--card-bg)", color: "var(--text-color)" }}
      >
        <h2 className="text-center mb-4" style={{ marginTop: "20px" }}>
          {editMode ? "Edit Blog" : "Add Blog"}
        </h2>

        <MDBValidation noValidate onSubmit={handleSubmit} className="g-3">
          <MDBValidationItem feedback="Please provide a title" invalid className="mb-4">
            <MDBInput
              value={title || ""}
              name="title"
              type="text"
              onChange={onInputChange}
              required
              label="Title"
            />
          </MDBValidationItem>

          <MDBValidationItem feedback="Please provide a description" invalid className="mb-4">
            <MDBTextArea
              value={description || ""}
              name="description"
              onChange={onInputChange}
              required
              label="Description"
              rows={4}
            />
          </MDBValidationItem>

          {!editMode && (
            <div className="mb-4">
              <label className="form-label">Upload Image</label>
              <MDBInput
                type="file"
                className="form-control"
                onChange={(e) => onUploadImage(e.target.files[0])}
                required
                validation="Please provide an image"
                invalid
              />
              {uploading && (
                <small className="text-primary">⏳ Uploading image...</small>
              )}
              {uploadSuccess && !uploading && (
                <small className="text-success">✅ Image uploaded successfully</small>
              )}
            </div>
          )}

          <MDBValidationItem feedback="Please select a category" invalid className="mb-4">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              onChange={onCategoryChange}
              value={category || ""}
              required
            >
              <option value="">Please select category</option>
              {options.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </MDBValidationItem>

          <div className="d-flex justify-content-center mt-4">
            <MDBBtn type="submit" style={{ marginRight: "10px" }}>
              {editMode ? "Update" : "Add"}
            </MDBBtn>
            <MDBBtn
              color="danger"
              type="button"
              onClick={() => navigate("/")}
            >
              Go Back
            </MDBBtn>
          </div>
        </MDBValidation>
      </div>
    </div>
  );
};

export default AddEditBlog;
