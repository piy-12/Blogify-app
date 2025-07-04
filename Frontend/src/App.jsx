import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import RegistrationForm from "./pages/Signup";
import LoginForm from "./pages/Signin";
import  {AuthProvider} from "./context/AuthContext";
import BlogApp from "./pages/AddBlog";
import Home from "./pages/Home";
import View from "./pages/View";
import MyBlogs from "./pages/MyBlogs";

function App() {
  return (
    <>
    <AuthProvider>
     <Navbar></Navbar>
     <Routes>
      <Route path="/" element={<Home></Home>}/>
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<RegistrationForm></RegistrationForm>} />
      <Route path="/signin" element={<LoginForm></LoginForm>} />
      <Route path="/create" element={<BlogApp></BlogApp>}/>
      <Route path="/view/:id" element={<View></View>}/>
      <Route path="/myBlogs" element ={<MyBlogs></MyBlogs>} />
    </Routes>
     </AuthProvider>
    </>
)}

export default App;
