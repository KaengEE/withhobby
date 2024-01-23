import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import commentService from "../../services/comment.service";

const CommentEdit = ({ show, handleClose, comment, handleUpdateComment }) => {
  const [updatedCommentText, setUpdatedCommentText] = useState("");

  useEffect(() => {
    oldComment();
  }, []);

  const oldComment = async () => {
    const response = await commentService.getComment(comment);
    setUpdatedCommentText(response.data.commentText);
    //console.log(updatedCommentText);
  };

  const handleSave = () => {
    handleUpdateComment(updatedCommentText, comment);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>댓글 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="updatedCommentText">
            <Form.Control
              type="text"
              value={updatedCommentText}
              onChange={(e) => setUpdatedCommentText(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleSave}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentEdit;
