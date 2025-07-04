import React, { useState } from 'react';

import axios from "axios";

function BlogApp(){
const [form, setForm] = useState({
    title: '',
    Body: '',
    coverImage: null,
})

const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'coverImage') {
      setForm({ ...form, coverImage: files[0] });  
    } else {
      setForm({ ...form, [name]: value });
    }
  };

const handleSubmit = async(e) => {

     e.preventDefault();

     const formData = new FormData();
     formData.append('title', form.title);
    formData.append('Body', form.Body);
    formData.append('coverImage', form.coverImage);
    
    try {
         const token = sessionStorage.getItem("token")
         await axios.post('http://localhost:8000/blog', formData, {
          headers: {
           Authorization: `Bearer ${token}`,
          }
         });
         alert("Blog Submitted Successfully")
        setForm({ title: '', Body: '', coverImage: null });
    } catch (error) {
        console.log("Error in sending data to the backend",error);
    }
}
  
return(
    <>
     <div className='max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white'>
        <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
        <form onSubmit={handleSubmit}>

           <label htmlFor="coverImage" className='block mb-1 font-medium'>CoverImage</label>
           <input className='w-full px-3 py-2 border rounded' type='file' name='coverImage' onChange={handleChange}></input>

            <label htmlFor="title" className='block mb-1 font-medium'>Title</label>
            <input className='w-full px-3 py-2 border rounded' type="text" placeholder='title' value={form.title} name='title' onChange={e => setForm({ ...form, title: e.target.value })} required>
            </input>
            <br />
            <label htmlFor="content" className='block mb-1 font-medium'>Content</label>
            <textarea className='w-full px-3 py-2 pb-7 border rounded ' placeholder='Content' value={form.Body} name="body" onChange={e => setForm({ ...form, Body: e.target.value })}
            required 
            > </textarea>
            <br />
            <button className='w-40 mt-5 bg-blue-500 text-white py-2 rounded hover:bg-blue-600' type='submit'>Submit</button>
        </form>
     </div>
    </>
);
}

export default BlogApp;