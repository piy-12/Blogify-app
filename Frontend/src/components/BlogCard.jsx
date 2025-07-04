
import { Link, Navigate } from "react-router-dom";


function BlogCard({ _id, title, Body, coverImageURL }) {

  return (
    <div className="m-15 bg-white shadow-lg border-b-black  ">
      {/* Image */}
      {coverImageURL && (
        <img
          src={`${import.meta.env.VITE_API_URL}${coverImageURL}`} // adjust if full URL
          alt="Blog Cover"
          className="w-full h-60 object-cover"
        />
      )}

   
      <div className="p-3">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {Body}
        </p>

       
       
      </div>
       <div className="flex justify-end">
        <Link to={`/view/${_id}`}>
          <button className="text-blue-600 hover:underline text-sm font-medium" >
            Read More →
          </button>
          </Link>
        </div>
    </div>
  );
}

export default BlogCard;
