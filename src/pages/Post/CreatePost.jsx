import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Post from "../../models/Post";
import postService from "../../services/post.service";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      const newPost = new Post(null, null, postTitle, postContent, null);

      await postService.createPost(newPost);

      navigate("/post");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div
      className="container mt-5 border rounded p-4 shadow"
      style={{ maxWidth: "800px" }}
    >
      <div className="container mt-4">
        <h2>글 작성하기</h2>
        <Form className="mt-3" onSubmit={handleCreatePost}>
          <Form.Group controlId="postTitle">
            <Form.Label>제목</Form.Label>
            <Form.Control
              type="text"
              placeholder="제목을 입력하세요"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="postContent">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="내용을 입력하세요"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </Form.Group>
          <div className="text-end mt-4">
            <Button variant="danger" type="button" className="me-2">
              취소
            </Button>
            <Button variant="primary" type="submit">
              작성 완료
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreatePost;
