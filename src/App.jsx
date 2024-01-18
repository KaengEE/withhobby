import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Join from "./pages/Login/Join";
import Post from "./pages/Post/Post";
import Category from "./pages/Category/Category";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/post" element={<Post />} />
            <Route path="/category" element={<Category />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
