import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
   const navigate = useNavigate(); 
  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error parsing user data from sessionStorage:", error);
      setUser(null);
    }
  }, []);

  
  const deleteUser = async (userId) => {
  try {
    const token = sessionStorage.getItem("token");

    const res = await axios.delete(`http://localhost:8000/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert(res.data); 
  } catch (err) {
    alert(err.response?.data || "Error deleting User");
  }
}



  const signIn = (userData) => {
  setUser(userData);
  sessionStorage.setItem("user", JSON.stringify(userData));
};


  const signOut = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, deleteUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
