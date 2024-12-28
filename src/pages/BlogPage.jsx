 import React from "react";
import { useParams } from "react-router-dom";
import { useBlogs } from "../contexts/BlogContext";

const BlogPage = () => {
  const { title } = useParams();
  
  const { blogs } = useBlogs();
  const blog = blogs.find((blog) => blog.title === title);

  return blog ? (
    <div>
      <h1>{blog.title}</h1>
      <img src={blog.coverImage} alt={blog.title} />
      <p>{blog.description}</p>
    </div>
  ) : (
    <p>Blog not found</p>
  );
};

export default BlogPage;
