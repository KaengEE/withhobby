import React, { useState } from 'react';
import userService from '../../services/user.service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCurrentUser } from '../../store/actions/user';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState(''); // 추가: 현재 비밀번호 state
  const [newPassword, setNewPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 로그아웃
  const logout = () => {
    dispatch(clearCurrentUser());
    navigate("/login");
  };

  const handleChangePassword = async () => {
    const password = { currentPassword : currentPassword,
    newPassword : newPassword}
    try {
      const response = await userService.changePassword(password); // 수정: 현재 비밀번호와 새 비밀번호 함께 전송
      console.log(response.data);
      // 비밀번호 변경 후 로그아웃
      // 로그아웃 후 로그인 페이지로 이동
      logout();
    } catch (error) {
      console.error('비밀번호 변경 중 오류 발생:', error);
    }
  };

  return (
    <Container style={{ width: "800px" , marginTop: "100px", marginBottom : "100px"}}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h4 className="mt-4">비밀번호 변경</h4>
          <Form>
            <Form.Group controlId="currentPassword">
              <Form.Label>현재 비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="현재 비밀번호 입력"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="newPassword">
              <Form.Label>새 비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="새 비밀번호 입력"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <div className='mt-3 text-end'>
            <Button variant="primary" onClick={handleChangePassword}>
              비밀번호 변경
            </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
