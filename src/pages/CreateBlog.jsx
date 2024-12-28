import React, { useState } from "react";
import { useBlogs } from "../contexts/BlogContext";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
 import { storage } from "../firebase/firebaseConfig";
import '../styles/login.css';

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);  
  const { addBlog } = useBlogs();
  const navigate = useNavigate();

  const handleImageUpload = async () => {
    if (!coverImage) return null;

    const imageRef = ref(storage, `coverImages/${coverImage.name}`);
    await uploadBytes(imageRef, coverImage);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  };


   const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await handleImageUpload();
console.log("Image URL "+ imageUrl);
    

     const newBlog = {
      title,
      description,
      coverImage: imageUrl,
    };
console.log("New blog "+ newBlog);
     addBlog(newBlog);

     navigate("/");
  };

   const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);

     const fileURL = URL.createObjectURL(file);
    setPreview(fileURL);
  };

  return (
    <div className="create-blog-container">
      <div className="create-blog-form-container">
        <h1>Create a New Blog</h1>
        <form onSubmit={handleSubmit} className="create-blog-form">
          <div className="input-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog Title"
              className="form-input"
            />
          </div>
          <div className="input-group">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Blog Description"
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
                onChange={handleFileChange}  
                className="image-upload-input"
              />
            </label>
          </div>
          <button type="submit" className="form-submit-button">
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
