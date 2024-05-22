import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/user.service';

//관리자 페이지
const UsersList = () => {
  const [userList, setUserList] = useState([]); //유저리스트
  const currentUser = useSelector((state) => state.user); //유저확인
  const navigate = useNavigate();

  //유저리스트가져오기
  const fetchUserList = async () => {
      try {
          const response = await userService.getUserList();
          //console.log(response.data);
          setUserList(response.data);
      } catch (error) {
          console.error("회원 목록 가져오는데 실패했습니다.", error);
      }
  }

    // 유저 권한 변경 ADMIN <=> USER
    const fetchChangeRole = async (username, currentRole) => {
      try {
          const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
          await userService.changeRole(username, newRole);
          console.log("권한변경");
          // 유저 리스트를 다시 가져와서 업데이트
          fetchUserList();
      } catch (error) {
          console.error("권한 변경 실패", error);
      }
  }


  // 권한 및 로그인 상태 확인
  useEffect(() => {
      console.log("Current User:", currentUser);
      if (!currentUser) {
          alert("로그인 해주세요.");
          navigate('/login'); // 로그인 페이지로 이동
      } else if (currentUser.role !== 'ADMIN') {
          alert("관리자 권한이 없습니다!");
          navigate('/'); // 메인 페이지로 이동
      } else{
        fetchUserList();
      }

  }, []);

  if (!currentUser || currentUser.role !== 'ADMIN') {
      return null; // 리디렉션 중일 때 컴포넌트 렌더링 방지
  }


    return (
        <Container>
          <h1>회원관리</h1>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>이름</th>
                        <th>가입일</th>
                        <th>역할</th>
                        <th>권한</th>
                        <th>권한변경</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{new Date(user.createTime).toLocaleDateString()}</td>
                            <td>{user.userStatus}</td>
                            <td>{user.role}</td>
                            <td>
                              <Button 
                                onClick={() => fetchChangeRole(user.username, user.role)}
                              >
                                권한변경
                              </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container>
    );
}

export default UsersList;
