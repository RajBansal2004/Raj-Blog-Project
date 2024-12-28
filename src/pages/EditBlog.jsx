import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogs } from "../contexts/BlogContext"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

const EditBlog = () => {
  const { titles } = useParams(); 
  const { getBlogById, updateBlog } = useBlogs(); 
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);  

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);

     const fileURL = URL.createObjectURL(file);
    setPreview(fileURL);
  };


    const handleImageUpload = async () => {
      if (!coverImage) return null;
  
      const imageRef = ref(storage, `coverImages/${coverImage.name}`);
      await uploadBytes(imageRef, coverImage);
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    };
  useEffect(() => {
    if (titles) {
      console.log("title" ,titles);
      const blog = getBlogById(titles); 
      if (blog) {
        setTitle(blog.title);
        setDescription(blog.description);
        setCoverImage(blog.coverImage);
      } else {
        console.log("Blog not found");
      }
    }
  }, [titles, getBlogById]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageUrl =   handleImageUpload();

    const updatedBlog = { titles, title, description, imageUrl };
    updateBlog(updatedBlog);

    navigate("/");
  };
  

  return (
    <div className="create-blog-container">
      <div className="create-blog-form-container">
      <h1>Edit Blog</h1>
      <form onSubmit={handleSubmit} className="create-blog-form">
        <div className="input-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div className="input-group">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
             className="form-textarea"
          />
        </div>
     

<div className="input-group image-upload-group">
            <label className="image-upload-label">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="image-preview-inside"
                />
              ) : (
                "Upload Cover Image"
              )}
              <input
                type="file"
                onChange={(e) => setCoverImage(e.target.files[0])}
                className="image-upload-input"
              />
            </label>
          </div>

        <button type="submit">Save Changes</button>
      </form>
      </div>
      </div>
  );
};

export default EditBlog;
