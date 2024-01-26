import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import postService from "../../services/post.service";
import "./Post.css";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]); //화면에 보이는 posts
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPostList();
  }, [currentPage]);

  const fetchPostList = async () => {
    try {
      const response = await postService.getPostList(currentPage + 1);
      console.log(response.data);
      const sortedPosts = response.data.sort((a, b) => b.id - a.id);
      setPosts(sortedPosts);

      const totalPostsCount = response.data.length;
      const postsPerPage = 5;

      // 시작과 끝 index
      const startIndex = currentPage * postsPerPage;
      const endIndex = startIndex + postsPerPage;

      const postsSubset = sortedPosts.slice(startIndex, endIndex);

      // 잘린 만큼 보여주기
      setPostsToDisplay(postsSubset);

      const totalPagesCount = Math.ceil(totalPostsCount / postsPerPage);
      setTotalPages(totalPagesCount);
    } catch (error) {
      if (currentUser == null) {
        alert("로그인해주세요!");
        navigate("/login");
      } else {
        console.error("목록 가져오기 실패:", error);
      }
    }
  };

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
          {postsToDisplay &&
            postsToDisplay.map((post, index) => (
              <tr key={post.id}>
                <th scope="row">{index + 1 + currentPage * 5}</th>
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
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={4}
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
