import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Signup from "./pages/Signup.jsx";
import LoginForm from "./pages/Signin";
import  {AuthProvider} from "./context/AuthContext";
import BlogApp from "./pages/AddBlog";
import Home from "./pages/Home";
import View from "./pages/View";
import MyBlogs from "./pages/MyBlogs";
import Footer from "./components/Footer.jsx";
import Update from './pages/Update.jsx';

function App() {
  return (
    <>
    <AuthProvider>
     <Navbar></Navbar>
     
     <Routes>
      <Route path="/" element={<Home></Home>}/>
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<Signup></Signup>} />
      <Route path="/signin" element={<LoginForm></LoginForm>} />
      <Route path="/create" element={<BlogApp></BlogApp>}/>
      <Route path="/view/:id" element={<View></View>}/>
      <Route path="/myBlogs" element ={<MyBlogs></MyBlogs>} />
      <Route path="/updateblogs/:id" element={<Update></Update>} />
    </Routes>
     </AuthProvider>
     <Footer></Footer>
    </>
)}

export default App;
