import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import postService from "../../services/post.service";
import "./Post.css";
import { useSelector } from "react-redux";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    fetchPostList();
  }, []);

  // 게시글 목록 가져오기
  const fetchPostList = async () => {
    try {
      const response = await postService.getPostList();
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      if (currentUser == null) {
        alert("로그인해주세요!");
        navigate("/login");
      } else {
        console.error("목록 가져오기 실패:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h3>자유게시판</h3>

      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">작성일</th>
          </tr>
        </thead>
        <tbody>
          {/* 게시글 목록을 반복하여 표시 */}
          {posts.map((post) => (
            <tr key={post.id}>
              <th scope="row">{post.id}</th>
              <td>
                <Link to={`/post/detail/${post.id}`} className="link">
                  {post.postTitle}
                </Link>
              </td>
              <td>{post.user.username}</td>
              <td>{new Date(post.createAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-end">
        <Link to="/createPost" className="btn btn-primary">
          글쓰기
        </Link>
      </div>
      {/* 페이징 */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Post;
