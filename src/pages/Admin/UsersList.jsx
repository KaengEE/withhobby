import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//관리자 페이지
const UsersList = () => {

    const [userList, setUserList] = useState([]); //유저리스트
    const currentUser = useSelector((state) => state.user); //유저확인
    const navigate = useNavigate();


    //유저리스트가져오기
    const fetchUserList = async () => {
        try {
          const response = await userService.getUserList();
          console.log(response);
          setUserList(response.data);
        } catch (error) {
            console.error("회원 목록 가져오는데 실패했습니다.");
        }
    }

    // 권한 및 로그인 상태 확인
    useEffect(() => {
        if (!currentUser) {
            alert("로그인 해주세요.");
            navigate('/login'); // 로그인 페이지로 이동
        } else if (currentUser.role !== 'ADMIN') {
            alert("관리자 권한이 없습니다!");
            navigate('/'); // 메인 페이지로 이동
        }
    }, []);

    if (!currentUser || currentUser.role !== 'ADMIN') {
        return null; // 리디렉션 중일 때 컴포넌트 렌더링 방지
    }

    fetchUserList();

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Name</th>
                        {/* 다른 사용자 정보 열 추가 */}
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            {/* 다른 사용자 정보 행 추가 */}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default UsersList;
