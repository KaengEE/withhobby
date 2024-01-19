import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./Mypage.css";
const MypageModal = ({
  isModalOpen,
  closeModal,
  avatar,
  onAvatarChange,
  newName,
  handleEdit,
}) => {
  return (
    <div>
      <Modal
        show={isModalOpen}
        onHide={closeModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            프로필사진
            <div className="img">
              {avatar && <img src={avatar} alt="User Avatar" />}
            </div>
            <input
              onChange={onAvatarChange}
              id="avatar"
              type="file"
              accept="image/*"
            />
          </label>
          <label>
            이름: <input type="text" value={newName}></input>
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            수정
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MypageModal;
