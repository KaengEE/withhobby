import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import img from "../../assets/sample.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import "./Mypage.css";
import MypageModal from "./MypageModal";
import userService from "../../services/user.service";
import { storage } from "../../firebase";
import { setCurrentUser } from "../../store/actions/user";

const Mypage = () => {
  const currentUser = useSelector((state) => state.user); //현재유저
  //프로필사진
  const [avatar, setAvatar] = useState(currentUser?.userProfile || img);
  //새프로필사진
  const [newAvatar, setNewAvatar] = useState(currentUser?.userProfile || img);
  //수정이름
  const [newName, setNewName] = useState(currentUser.name);

  const dispatch = useDispatch();

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
  };

  console.log(currentUser);

  return (
    <div className="container mt-5">
      <div className="container">
        <Card className="text-center">
          {/* 이미지 */}
          <div className="img">
            {avatar && <img src={currentUser?.userProfile} alt="User Avatar" />}
          </div>
          <Card.Body>
            <Card.Title>
              <strong>{currentUser?.name}</strong>
            </Card.Title>
            <Card.Text>
              👑 {currentUser?.userStatus} {currentUser?.role}
            </Card.Text>
            <Button variant="primary" onClick={openModal}>
              프로필 수정
            </Button>
          </Card.Body>
        </Card>
        <Card className="mt-5">
          <Card.Body>
            <Card.Title>Profile Information</Card.Title>
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
      />
    </div>
  );
};

export default Mypage;
