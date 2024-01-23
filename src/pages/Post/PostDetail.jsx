import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../../services/post.service";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user); //현재유저

  useEffect(() => {
    // 게시글 상세조회 함수 호출
    const fetchPostDetail = async () => {
      try {
        const response = await postService.getPostDetail(postId);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post detail:", error);
      }
    };

    fetchPostDetail(); // useEffect에서 호출
  }, [postId]);

  const removePost = async () => {
    await postService.deletePost(postId);
    navigate("/post");
  };

  return (
    <div className="container mt-5">
      <Button
        onClick={() => {
          navigate("/post");
        }}
      >
        이전으로
      </Button>

      {post && (
        <>
          <div className="card mt-5">
            <div className="card-body d-flex justify-content-evenly">
              {/* 왼쪽에 세로로 정렬 */}
              <div className="col">
                <h2>{post?.postTitle}</h2>
              </div>

              {/* 오른쪽에 가로로 정렬 */}
              <div className="col">
                <p className="card-subtitle mb-2 text-muted">
                  작성자: {post.user.username} | 작성일:{" "}
                  {new Date(post.createAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="card-body">
              <p className="card-text">{post.postText}</p>
            </div>
          </div>
          {currentUser.id == post?.user.id && (
            <div className="text-end mt-3">
              <Button className="btn-danger mx-2" onClick={removePost}>
                삭제
              </Button>
              <Link to={`/post/edit/${postId}`} className="btn btn-primary">
                수정
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostDetail;
