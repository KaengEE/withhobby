import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import postService from "../../services/post.service";
import "./Post.css";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  //페이지네이션(react-pagination)
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPostList();
  }, [currentPage]);

  // 게시글 목록 가져오기
  const fetchPostList = async () => {
    try {
      const response = await postService.getPostList(currentPage + 1);
      setPosts(response.data);
      console.log(response.data);
      // 배열의 길이를 사용하여 페이지 수 계산(5개씩)
      setTotalPages(Math.ceil(response.data.length / 5));
      console.log("페이지 수:", totalPages);
    } catch (error) {
      if (currentUser == null) {
        alert("로그인해주세요!");
        navigate("/login");
      } else {
        console.error("목록 가져오기 실패:", error);
      }
    }
  };

  //page 메서드
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
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
          {posts &&
            posts.map((post, index) => (
              <tr key={post.id}>
                <th scope="row">{index + 1}</th>
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
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        breakClassName="page-item"
        previousClassName="page-item"
        nextClassName="page-item"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        activeClassName="active"
        initialPage={currentPage}
      />
    </div>
  );
};

export default Post;
