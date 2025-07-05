import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Signup from "./pages/Signup.jsx";
import LoginForm from "./pages/Signin";
import  {AuthProvider} from "./context/AuthContext";
import BlogApp from "./pages/AddBlog";
import Home from "./pages/Home";
import View from "./pages/View.jsx";
import MyBlogs from "./pages/MyBlogs";
import Footer from "./components/Footer.jsx";
import Update from './pages/Update.jsx';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<LoginForm />} />
            <Route path="/create" element={<BlogApp />} />
            <Route path="/view/:id" element={<View />} />
            <Route path="/myblogs" element={<MyBlogs />} />
            <Route path="/updateblogs/:id" element={<Update />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </AuthProvider>
  );
}


export default App;
