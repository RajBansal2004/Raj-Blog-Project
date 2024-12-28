import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const BlogCard = ({ blog }) => {
  const { user } = useAuth(); 

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
    </div>
  );
};

export default BlogCard;
