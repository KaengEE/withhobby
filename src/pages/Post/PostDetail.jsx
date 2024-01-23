import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postService from "../../services/post.service";
import { Button } from "react-bootstrap";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const navigate = useNavigate();

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

  console.log(post);

  return (
    <div className="container mt-5">
      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        이전으로
      </Button>

      {post && (
        <>
          <div className="card">
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
          <div className="text-end mt-3">
            <Button className="btn-danger mx-2">삭제</Button>
            <Button>수정</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetail;
