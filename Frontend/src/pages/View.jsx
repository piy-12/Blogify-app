import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../context/AuthContext.jsx'

function View() {
    const render = useAuth();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState("");
 
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const token = sessionStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL}/blog/comm/${id}`, {
        content: newComment
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      alert("Comment added!");
      setNewComment("");
     await fetchComments();
    } catch (err) {
      console.log("Error submitting comment:", err);
    }
  };


  const fetchBlog = async () => {
    try {
      
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/${id}`, {
       
      });
      setBlog(res.data.blog);
      
    } catch (err) {
      console.error("Error fetching blog", err);
    }
  };

  const fetchComments = async ()=> {
    try{
      
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blog/${id}`)
      
     
      setComment(res.data.comments);
    }catch(err){
      console.log("error fetching comments",err);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  

  if (!blog  ) {
    return (
      <>
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading...
      </div>
      </>
    );
  }
  


  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">

  <h1 className="text-3xl font-bold mb-4 text-gray-800">{blog.title}</h1>

  
  <img
    src={`${import.meta.env.VITE_API_URL}${blog.coverImageURL}`}
    alt="Blog Cover"
    className="w-full h-auto max-h-[400px] object-cover rounded-md mb-6"
  />


  <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-sm mb-8">
  
  <div className="prose prose-base max-w-none text-gray-800">
    {blog.Body}
  </div>
</div>
         <div className="flex items-center gap-3 mt-6 border-t pt-4">
    <img
      src={
        blog.createdBy?.profileImageURL
          ? `${import.meta.env.VITE_API_URL}${blog.createdBy.profileImageURL}`
          : "https://ui-avatars.com/api/?name=Deleted+User"
      }
      alt="Author"
      className="w-10 h-10 rounded-full object-cover"
    />
    <span className="text-md text-gray-700 font-medium">
      {blog.createdBy?.fullName || "Deleted User"}
    </span>
  </div>
</div>
       {!render.user && (
        <div>You need to Login to add a comment</div>
       )}
        {render.user && (
          <>
          <div className='mt-4'>
           <form onSubmit={handleSubmit}>
          <h2 className='text-xl font-bold mb-2'>Add a Comment</h2>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded mb-3"
            placeholder="Enter your comment"
            name="content"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add
          </button>
        </form>
      </div>
      </>
        )}
        

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Comments ({comment.length})</h2>
        {comment.map((comm, index) => (
  <div key={index} className="flex items-start mb-4">
    <img
      src={
        comm.createdBy?.profileImageURL
          ?`${import.meta.env.VITE_API_URL}${comm.createdBy.profileImageURL}`
          : "https://ui-avatars.com/api/?name=Deleted+User"
      }
      alt="User"
      className="w-10 h-10 rounded-full object-cover mr-3"
    />
    <div>
      <span className="font-semibold">
        {comm.createdBy?.fullName || "Deleted User"}
      </span>
      <p className="text-gray-700">{comm.content}</p>
    </div>
  </div>
        ))}
      </div>
    </>
  );
}

export default View;
