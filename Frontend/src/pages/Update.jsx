
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    Body: ""
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          title: res.data.title,
          Body: res.data.Body,
        });
      } catch (err) {
        console.error("Failed to fetch blog", err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(`${import.meta.env.VITE_API_URL}/blog/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(formData);
      navigate("/");
    } catch (err) {
      console.error("Failed to update blog", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          className="w-full border p-2"
          placeholder="Blog Title"
        />
        <textarea
          name="Body"
          value={formData.Body || ""}
          onChange={handleChange}
          className="w-full border p-2 h-40"
          placeholder="Blog Content"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
