import React from "react";
import { useBlogs } from "../contexts/BlogContext";
import BlogCard from "../components/BlogCard"; 

const HomePage = () => {
  const { blogs } = useBlogs(); 

  return (
    <div>
      <h1>All Blogs</h1>
      <div className="blog-list">
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />  
          ))
        ) : (
          <p>No blogs available.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
