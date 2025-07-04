import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx'

const LoginForm =  () => {

  const navigate = useNavigate();
  const {signIn}= useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log("Full Backend Response:", data);

    if (!response.ok) {
      if (response.status === 404 && data.message === "User does not exist") {
        alert("User does not exist. Please create an account.");
      } else {
        setError(data.message || "Invalid email or password.");
      }
      return;
    }



   
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", JSON.stringify(data.user));
    signIn(data.user);
    navigate("/");

  } catch (error) {
    console.error("Error during sign-in:", error);
    setError("Something went wrong. Please try again.");
  }
};

  return (
       <>
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
       {error && (
        <div className='mb-4 text-red-600 bg-red-100 p-2 rounded'>
          {error}
        </div>
       )}
      <h2 className="text-2xl font-bold mb-4">Sign-in Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
     </>
  );
};

export default LoginForm;
