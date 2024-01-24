import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import togetherService from "../../services/together.service";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import teamService from "../../services/team.service";

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

  const isUserMember = (togetherId) => {
    return togetherService.checkMember(currentUser.id, togetherId);
  };

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
            <th>신청</th>
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
              <td>
                {/* 현재유저가 해당 모임의 멤버이면 취소버튼만 보이게함 */}
                {isUserMember(together.id) ? (
                  <Button>신청</Button>
                ) : (
                  <Button className="btn-danger ms-1">취소</Button>
                )}
              </td>
              <td>
                {currentUser.id == hostId ? (
                  <Button
                    className="btn-danger"
                    onClick={() => removeTogether(together.id)}
                  >
                    삭제
                  </Button>
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
