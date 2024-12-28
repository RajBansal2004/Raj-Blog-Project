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

  const deleteBlog = (title) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.title !== title));
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, updateBlog,deleteBlog, getBlogById  }}>
      {children}
    </BlogContext.Provider>
  );
};
