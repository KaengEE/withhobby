import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import togetherService from "../../services/together.service";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import togetherMemberService from "../../services/togetherMember.service";

const Together = ({ teamId, hostId }) => {
  const [togethers, setTogethers] = useState([]);
  const currentUser = useSelector((state) => state.user); //현재유저

  useEffect(() => {
    fetchTogetherList();
  }, []);

  //리스트불러오기
  const fetchTogetherList = async () => {
    const response = await togetherService.getTogetherList(teamId);
    setTogethers(response.data);
  };

  //모임삭제
  const removeTogether = async (togetherId) => {
    // 확인 창을 띄움
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (confirmDelete) {
      await togetherService.removeTogether(togetherId);
      //삭제 후 리스트 다시 불러옴
      fetchTogetherList();
    }
  };

  //모임의 멤버인지 확인(멤버가 맞으면 true)
  const isUserMember = async (togetherId) => {
    const response = await togetherService.checkMember(
      currentUser.id,
      togetherId
    );
    console.log(currentUser.id);
    console.log(togetherId);
    return response.data;
  };

  //모임 join
  const joinTogether = async (togetherId) => {
    await togetherMemberService.joinTogether(teamId, togetherId);
    console.log(togetherId);
    alert("참가완료!");
    fetchTogetherList();
  };

  //모임 취소

  return (
    <div>
      <h4>모임</h4>
      {currentUser.id == hostId ? (
        <Link to={`/together/create/${teamId}`} className="btn btn-primary">
          모임생성
        </Link>
      ) : null}
      {/* 모임리스트 - 테이블 형식 */}
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>설명</th>
            <th>날짜</th>
            {currentUser.id == hostId ? null : <th>신청</th>}
            {currentUser.id == hostId ? <th>관리</th> : null}
          </tr>
        </thead>
        <tbody>
          {togethers.map((together, index) => (
            <tr key={together.id}>
              <td>{index + 1}</td>
              <td>{together.title}</td>
              <td>{together.togetherDep}</td>
              <td>{together.date}</td>
              {currentUser.id != hostId ? (
                <td>
                  {/* 현재유저가 해당 모임의 멤버이면 취소버튼만 보이게함 */}
                  {isUserMember ? (
                    <Button className="btn-danger ms-1">취소</Button>
                  ) : (
                    <Button onClick={() => joinTogether(together.id)}>
                      신청
                    </Button>
                  )}
                </td>
              ) : null}

              <td>
                {currentUser.id == hostId ? (
                  <>
                    <Button
                      className="btn-danger"
                      onClick={() => removeTogether(together.id)}
                    >
                      삭제
                    </Button>
                    <Button>멤버확인</Button>
                  </>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Together;
