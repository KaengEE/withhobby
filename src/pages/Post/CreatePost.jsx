import React from "react";
import { Button, Form } from "react-bootstrap";

const CreatePost = () => {
  return (
    <div
      className="container mt-5 border rounded p-4 shadow"
      style={{ maxWidth: "800px" }}
    >
      <div className="container mt-4">
        <h2>글 작성하기</h2>
        <Form className="mt-3">
          <Form.Group controlId="postTitle">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" placeholder="제목을 입력하세요" />
          </Form.Group>

          <Form.Group controlId="postContent">
            <Form.Label>내용</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="내용을 입력하세요"
            />
          </Form.Group>
          <div className="text-end mt-4">
            <Button variant="danger" type="submit" className="me-2">
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
