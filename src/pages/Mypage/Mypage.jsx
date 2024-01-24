import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
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

  console.log(hostTeam);

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
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              quam velit, vulputate eu pharetra nec, mattis ac neque. Duis
              vulputate commodo lectus, ac blandit elit tincidunt id.
            </Card.Text>
          </Card.Body>
        </Card>
        {/* 나의 모임 */}
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
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              quam velit, vulputate eu pharetra nec, mattis ac neque. Duis
              vulputate commodo lectus, ac blandit elit tincidunt id.
            </Card.Text>
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
