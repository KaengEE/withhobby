import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import togetherMemberService from "../../services/togetherMember.service";
import userService from "../../services/user.service";

const TogetherMember = ({ show, handleClose, togetherId }) => {
  const [members, setMembers] = useState([]);
  const [memberNames, setMemberNames] = useState([]);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const membersData = await togetherMemberService.getTogetherMember(
          togetherId
        );
        setMembers(membersData.data);

        // Extract user IDs and fetch usernames
        const userIds = membersData.data.map((member) => member.userId);
        const names = await Promise.all(userIds.map(findUsername));
        setMemberNames(names);
      } catch (error) {
        console.error("멤버 불러오는데 실패함:", error);
      }
    };

    if (show) {
      getMembers();
    }
  }, [show, togetherId]);

  // 유저 아이디로 유저네임 찾기(username)
  const findUsername = async (userId) => {
    const response = await userService.getUserById(userId);
    return response.data.username;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>멤버 리스트</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {members.length > 0 ? (
          <ul>
            {members.map((member, index) => (
              <li key={member.id}>{memberNames[index]}</li>
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
