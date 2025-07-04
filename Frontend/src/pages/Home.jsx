import React, { useEffect, useState } from 'react';

import BlogCard from '../components/BlogCard.jsx'
import axios from "axios"

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = sessionStorage.getItem("token")
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog`,{
          headers: {
           Authorization: `Bearer ${token}`,
          }
        });
      console.log("API URL:", import.meta.env.VITE_API_URL);

        console.log(res.data);
        setBlogs(res.data.blogs);

      } catch (err) {
        console.error("Error fetching blogs", err);
      }
    };

    fetchBlogs();
  }, []);


  return (
    <>
    <body className='bg-gray-700'></body>
    <h1 className=" text-center pt-2 text-3xl font-bold text-white ">Latest Blogs</h1>
    <div className=" flex flex-wrap" >
      

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        blogs.map(blog => (
          <BlogCard
            key={blog._id}
            _id = {blog._id}
            title={blog.title}
      
            coverImageURL={blog.coverImageURL}

          />
        ))
      )}
    </div>
    </>
  );
}

export default Home;
