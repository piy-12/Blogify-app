import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext'

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const render = useAuth();
  const {signOut} = useAuth();
  const {deleteUser, user} = useAuth();
 

  return (
    <nav className="shadow-md px-4 py-3 flex justify-between items-center bg-black text-white">
      <Link to="/" className="text-xl font-bold hover:text-blue-600">Blogify</Link>

      <ul className="flex items-center gap-4 ">
        <li>
          <Link to="/" className="hover:text-blue-500">Home</Link>
        </li>
        <li className="px-2 py-2 hover:text-blue-500">
                <Link to="/about">About</Link>
              </li>
      {render.user && (
        <>
        <li>
          <Link to="/create" className="hover:text-blue-500">Add Blog</Link>
        </li>
       

        <li className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="hover:text-blue-500"
          >
            {render.user.fullName}▼
          </button>
      
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 bg-white text-black border rounded shadow-lg w-44 z-10">
  <li>
    <Link
      to="/myBlogs"
      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
    >
      My Blogs
    </Link>
  </li>
  <li>
    <button
      onClick={() => {
        signOut();
        setDropdownOpen(false);
      }}
      className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
    >
      Logout
    </button>
  </li>
  <li>
    <button
      onClick={() => {
        deleteUser(render.user._id);
        signOut();
        setDropdownOpen(false);
      }}
      className="block px-4 py-2 hover:bg-red-100 text-red-600 w-full text-left"
    >
      Delete Your Account
    </button>
  </li>
</ul>

          )}
         
        </li>
        </>
   )}
   {!render.user && (
    <>
    <li>
          <Link to="/signup" className="hover:text-blue-500">Create Account</Link>
        </li>
        <li>
          <Link to="/signin" className="hover:text-blue-500">Signin</Link>
        </li>
    </>
   )}

      </ul>
    </nav>
  );
};

export default Navbar;
