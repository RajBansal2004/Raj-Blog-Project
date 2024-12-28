import React, { createContext, useContext, useState } from "react";

 const BlogContext = createContext();

export const useBlogs = () => {
  return useContext(BlogContext);
};

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

   const getBlogById = (title) => {
    return blogs.find((blog) => blog.title === title); 
  };

  const addBlog = (blog) => {
    setBlogs((prevBlogs) => [...prevBlogs, blog]);
  };

  const updateBlog = (updatedBlog) => {
      setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.title === updatedBlog.titles ? updatedBlog : blog
      )
    );
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, updateBlog, getBlogById }}>
      {children}
    </BlogContext.Provider>
  );
};
