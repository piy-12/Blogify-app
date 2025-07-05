import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from '../components/BlogCard.jsx'
import { useNavigate } from "react-router-dom";

function MyBlogs() {
   const Navigate = useNavigate();
  const [myblogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/myBlogs`, {
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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Blogs</h1>

      {myblogs.map((blog) => (
        <div key={blog._id} className="border p-4 mb-4 rounded bg-gray-100">
          <h2 className="text-lg font-semibold">{blog.title}</h2>
          <p className="text-gray-700">{blog.content}</p>
          <button
            onClick={() => Navigate(`/updateblogs/${blog._id}`)}
            className="mt-2 text-sm text-white bg-blue-600 px-3 py-1 rounded"
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyBlogs;
