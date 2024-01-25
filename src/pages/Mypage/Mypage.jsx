import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import img from "../../assets/sample.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "./Mypage.css";
import MypageModal from "./MypageModal";
import userService from "../../services/user.service";
import { storage } from "../../firebase";
import { setCurrentUser } from "../../store/actions/user";
import teamService from "../../services/team.service";
import { Link } from "react-router-dom";
import postService from "../../services/post.service";
import togetherService from "../../services/together.service";

const Mypage = () => {
  const currentUser = useSelector((state) => state.user); //현재유저
  //유저객체
  const [user, setUser] = useState();
  //프로필사진
  const [avatar, setAvatar] = useState(currentUser?.userProfile || img);
  //새프로필사진
  const [newAvatar, setNewAvatar] = useState(currentUser?.userProfile || img);
  //수정이름
  const [newName, setNewName] = useState(currentUser.name);
  //hostTeam
  const [hostTeam, setHostTeam] = useState();
  //myTeam
  const [myTeam, setMyTeam] = useState([]);
  //myPost
  const [myPost, setMyPost] = useState([]);
  //myTogether
  const [myTogether, setMyTogether] = useState([]);

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getUser(currentUser.id);
    getHostTeam(currentUser.id);
    getMyTeamList(currentUser.username);
    getMyPost(currentUser.id);
    getMyTogether(currentUser.id);
  }, []);

  //유저 가져오기
  const getUser = async (userId) => {
    const response = await userService.getUserById(userId);
    setUser(response.data);
  };

  // 이름 변경 이벤트 핸들러
  const handleNameChange = (newNameValue) => {
    setNewName(newNameValue);
  };

  //프로필사진수정
  const onAvatarChange = async (e) => {
    const { files } = e.target; //입력한 파일
    //console.log(files);
    if (!currentUser) return; //유저가 없으면 return
    if (files && files.length === 1) {
      const file = files[0];
      //파일크기
      if (file.size > 1000 * 1000) {
        alert("이미지 사이즈는 1MB이하로 해주세요");
        e.target.value = "";
        return;
      }
      //이미지 업로드시 참조주소 avatars/유저id
      const locationRef = ref(storage, `avatars/${currentUser?.id}`);
      //이미지 파일 업로드
      const result = await uploadBytes(locationRef, file);
      //db에 입력할 주소
      const avatarUrl = await getDownloadURL(result.ref);
      setNewAvatar(avatarUrl);
    }
  };

  // 내가 host인 팀 찾기
  const getHostTeam = async (userId) => {
    try {
      const response = await teamService.getHostTeam(userId);
      setHostTeam(response?.data);
      //console.log(response?.data);
    } catch (error) {
      console.error("나의 팀 가져오기 실패:", error);
    }
  };

  //내가 속한 팀 리스트
  const getMyTeamList = async (username) => {
    try {
      const response = await teamService.getMyTeamList(username);
      setMyTeam(response?.data);
    } catch (error) {
      console.error("나의 팀 가져오기 실패:", error);
    }
  };

  //내가 작성한 게시글
  const getMyPost = async (userId) => {
    try {
      const response = await postService.getUserPost(userId);
      setMyPost(response?.data);
    } catch (error) {
      console.error("나의 게시글 가져오기 실패:", error);
    }
  };

  //내가 참여한 모임
  const getMyTogether = async (userId) => {
    try {
      const response = await togetherService.getUserTogether(userId);
      setMyTogether(response?.data);
    } catch (error) {
      console.error("나의 모임 가져오기 실패:", error);
    }
  };

  //프로필 수정
  const handleEdit = async () => {
    if (!currentUser) return;

    // 프로필 업데이트
    await userService
      .updateProfile({
        ...currentUser,
        name: newName,
        userProfile: newAvatar, // 이미지 URL 추가
      }) //프로필 이미지 DB에서 가져오기
      .then((res) => {
        setCurrentUser({ ...res.data, userProfile: newAvatar });
      });

    // 새로운 프로필 사진이 선택되었을 경우만 업데이트
    if (newAvatar !== currentUser.userProfile) {
      setAvatar(newAvatar);
    }

    // 모달 닫기
    closeModal();
    //유저 다시 가져오기
    getUser(currentUser.id);
  };

  return (
    <div className="container mt-5">
      <div className="container">
        <Card className="text-center">
          {/* 이미지 */}
          <div className="img">
            {avatar && <img src={user?.userProfile} alt="User Avatar" />}
          </div>
          <Card.Body>
            <Card.Title>
              <strong>{user?.name}</strong>
            </Card.Title>
            <Card.Text>
              👑 {user?.userStatus} {currentUser?.role}
            </Card.Text>
            <Button variant="primary" onClick={openModal}>
              프로필 수정
            </Button>
          </Card.Body>
        </Card>
        {/* 내가 속해있는 팀 */}
        <Card className="mt-5">
          <Card.Body>
            <Card.Title className="card-title">나의 팀</Card.Title>
            <div className="row">
              {myTeam.map((team, index) => (
                <div key={team.id} className="col-md-4 mt-3">
                  <Card style={{ height: "100%" }}>
                    <Card.Img
                      variant="top"
                      src={team.teamImg}
                      alt={`${team.teamname}`}
                      className="myTeam-image"
                    />
                    <Card.Body>
                      <Card.Title>{team.teamname}</Card.Title>
                      <Card.Text>{team.teamTitle}</Card.Text>
                      <Link to={`/team/detail/${team.id}`}>
                        <Button variant="primary">바로가기</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
            {!myTeam.length && <p>내가 속한 팀이 없습니다.</p>}
          </Card.Body>
        </Card>
        {/* 나의모임 */}
        <Card className="mt-5">
          <Card.Body>
            <Card.Title>나의 모임</Card.Title>
            {hostTeam && (
              <div className="team-info d-flex justify-content-center">
                {/* 이미지 */}
                {hostTeam.teamImg && (
                  <img
                    src={hostTeam.teamImg}
                    alt={`${hostTeam.teamname}`}
                    className="team-image"
                  />
                )}
                {/* 팀 정보 */}
                <div className="mt-5 ms-5">
                  <h5>{hostTeam.teamname}</h5>
                  <p>{hostTeam.teamTitle}</p>
                  {/* 바로가기 */}
                  <Link to={`/team/detail/${hostTeam.id}`}>
                    <Button variant="primary">바로가기</Button>
                  </Link>
                </div>
              </div>
            )}
            {!hostTeam && <p>내가 호스트인 모임이 없습니다.</p>}
          </Card.Body>
        </Card>
        {/* 내가 작성한 게시글 */}
        <Card className="mt-5">
          <Card.Body>
            <Card.Title>나의 게시글</Card.Title>
            <Card.Body>
              {/* 게시글 목록을 반복하여 표시 */}
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>작성일</th>
                  </tr>
                </thead>
                <tbody>
                  {myPost.map((post, index) => (
                    <tr key={post.id}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <Link to={`/post/detail/${post.id}`} className="link">
                          {post.postTitle}
                        </Link>
                      </td>
                      <td>{new Date(post.createAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card.Body>
        </Card>
        {/* 내가 작성한 게시글 */}
        <Card className="mt-5">
          <Card.Body>
            <Card.Title>나의 모임</Card.Title>
            <Card.Body>
              {/* 내가 가입한 모임 */}
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>이름</th>
                    <th>장소</th>
                    <th>날짜</th>
                    <th>팀명</th>
                  </tr>
                </thead>
                <tbody>
                  {myTogether.map((together, index) => (
                    <tr key={together.id}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <Link
                          to={`/team/detail/${together.team.id}`}
                          className="link"
                        >
                          {together.title}
                        </Link>
                      </td>
                      <td>{together.location}</td>
                      <td>{new Date(together.date).toLocaleDateString()}</td>
                      <td>{together.team.teamname}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card.Body>
        </Card>
      </div>
      {/* 모달 컴포넌트*/}
      <MypageModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        avatar={newAvatar}
        onAvatarChange={onAvatarChange}
        newName={newName}
        handleEdit={handleEdit}
        handleNameChange={handleNameChange}
      />
    </div>
  );
};

export default Mypage;
