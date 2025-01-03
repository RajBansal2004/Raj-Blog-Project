import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useBlogs } from "../contexts/BlogContext"; // Import the BlogContext

const BlogCard = ({ blog }) => {
  const { user } = useAuth(); 
  const { deleteBlog } = useBlogs();
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      deleteBlog(blog.title);  
    }
  };

  return (
    <div className="blog-card">
      <img src={blog.coverImage} alt={blog.title} />
      <h3>{blog.title}</h3>
      <p>{blog.description.substring(0, 43)}... <Link to={`/blog/${blog.title}`}>Read More</Link></p>

      {user && (
        <Link to={`/edit-blog/${blog.title}`} className="edit-blog-button">
          Edit Blog
        </Link>
      )}
    {user && (
        <button onClick={handleDelete} className="delete-blog-button">
          Delete Blog
        </button>
      )}
    </div>
  );
};

export default BlogCard;
