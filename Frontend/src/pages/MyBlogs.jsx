import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from '../components/BlogCard.jsx'

function MyBlogs() {
  const [myblogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/blog/myBlogs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMyBlogs(res.data.myBlogs);
      } catch (err) {
        console.log("Error Fetching MyBlogs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyBlogs();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600 mt-10">Loading Blogs...</div>;
  }

  if (myblogs.length === 0) {
    return <div className="text-center text-gray-600 mt-10">No blogs found.</div>;
  }

  return (
    <>
     <body className='bg-gray-700'></body>
    <h1 className=" text-center pt-2 text-3xl font-bold text-white ">My Blogs</h1>
    <div className=" flex flex-wrap" >
      

      {myblogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        myblogs.map(blog => (
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

export default MyBlogs;
