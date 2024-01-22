import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Join from "./pages/Login/Join";
import Post from "./pages/Post/Post";
import Category from "./pages/Category/Category";
import CreatePost from "./pages/Post/CreatePost";
import TeamList from "./pages/Team/TeamList";
import Mypage from "./pages/Mypage/Mypage";
import NotFound from "./pages/UnAuthorized/NotFound";
import UnAuthorized from "./pages/UnAuthorized/UnAuthorized";
import CreateCategory from "./pages/Category/CreateCategory";
import CreateTeam from "./pages/Team/CreateTeam";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            {/* 카테고리 주소 */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/post" element={<Post />} />
            <Route path="/category" element={<Category />} />
            <Route path="/mypage" element={<Mypage />} />
            {/* 부가 주소 */}
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/team/:categoryId" element={<TeamList />} />
            <Route path="/createCategory" element={<CreateCategory />} />
            <Route path="/team/create" element={<CreateTeam />} />

            {/* 오류 주소 */}
            <Route path="/404" element={<NotFound />} />
            <Route path="/401" element={<UnAuthorized />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
