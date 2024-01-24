import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import togetherMemberService from "../../services/togetherMember.service";

const TogetherMember = ({ show, handleClose, togetherId }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const membersData = await togetherMemberService.getTogetherMember(
          togetherId
        );
        setMembers(membersData);
      } catch (error) {
        console.error("멤버 불러오는데 실패함:", error);
      }
    };

    if (show) {
      getMembers();
    }
  }, [show, togetherId]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>멤버 리스트</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {members.length > 0 ? (
          <ul>
            {members.map((member) => (
              <li key={member.id}>{member.userId}</li>
            ))}
          </ul>
        ) : (
          <p>멤버가 없습니다.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TogetherMember;
