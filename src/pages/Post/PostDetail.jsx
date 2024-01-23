import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postService from "../../services/post.service";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import commentService from "../../services/comment.service";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]); // 댓글 목록 추가
  const [commentText, setCommentText] = useState(""); // 댓글 입력 상태 추가
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await postService.getPostDetail(postId);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post detail:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await commentService.getComments(postId);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    //console.log(comments);
    fetchPostDetail();
    fetchComments();
  }, [postId]);

  const removePost = async () => {
    // 확인 창을 띄움
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (confirmDelete) {
      await postService.deletePost(postId);
      navigate("/post");
    }
  };

  // 댓글관련
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // commentText가 비어 있는지 확인
    if (!commentText.trim()) {
      alert("댓글 내용을 입력하세요.");
      return;
    }

    try {
      await commentService.createComment(postId, { text: commentText });
      setCommentText(""); // 댓글 입력 후 초기화

      const response = await commentService.getComments(postId);
      setComments(response.data);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // 삭제 버튼 클릭 시 호출되는 함수
  const handleDeleteComment = async (commentId) => {
    // 확인 창을 띄움
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (confirmDelete) {
      try {
        // 삭제 확인되면 댓글 삭제
        await commentService.removeComment(commentId);
        // 댓글 삭제 후 댓글 목록을 다시 불러옴
        const response = await commentService.getComments(postId);
        setComments(response.data);
      } catch (error) {
        console.error("삭제오류:", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      {/* 이전으로 가는 버튼 */}
      <Button
        onClick={() => {
          navigate("/post");
        }}
      >
        이전으로
      </Button>

      {/* 포스트 내용 출력 */}
      {post && (
        <>
          <div className="card mt-5">
            <div className="card-body d-flex justify-content-evenly">
              <div className="col">
                <h2>{post?.postTitle}</h2>
              </div>
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

          {/* 포스트 작성자와 현재 유저가 동일한 경우에만 삭제, 수정 버튼 표시 */}
          {currentUser.id === post?.user.id && (
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

      {/* 댓글 섹션 */}
      <div className="card mt-5">
        <div className="card-body">
          <h5>댓글</h5>
        </div>

        {/* 댓글리스트 */}
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="card-body d-flex">
              <div className="col">
                <p className="card-text">{comment.commentText}</p>
              </div>
              <div className="col text-end">
                <span className="card-text">
                  작성자: {comment.user.name} (
                  {new Date(comment.createAt).toLocaleDateString()})
                </span>
              </div>
              {/* 작성자만 보이게 */}
              {currentUser.id === comment.user.id && (
                <div className="ms-auto me-3">
                  {/* 수정/삭제 버튼 클릭 시 해당 댓글의 commentId를 전달 */}
                  <Button
                    className="btn btn-danger me-2"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    삭제
                  </Button>
                  <Button className="btn btn-primary">수정</Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="card-body">댓글이 없습니다.</p>
        )}

        {/* 댓글 작성 폼 */}
        <Form onSubmit={handleCommentSubmit}>
          <Form.Group controlId="commentText" className="p-3">
            <Form.Control
              type="text"
              placeholder="댓글을 입력하세요."
              value={commentText}
              className="mt-3"
              onChange={(e) => setCommentText(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-end me-3 mb-3">
            <Button variant="primary" type="submit">
              댓글 작성
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PostDetail;
