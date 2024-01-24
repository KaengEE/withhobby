import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import togetherService from "../../services/together.service";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import togetherMemberService from "../../services/togetherMember.service";

const Together = ({ teamId, hostId }) => {
  const [togethers, setTogethers] = useState([]);
  const [userMemberships, setUserMemberships] = useState({});
  const currentUser = useSelector((state) => state.user);
  const [selectedTogether, setSelectedTogether] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchData();
  }, [teamId, currentUser.id]);

  const fetchData = async () => {
    const togetherList = await togetherService.getTogetherList(teamId);
    setTogethers(togetherList.data);

    const memberships = {};
    for (const together of togetherList.data) {
      memberships[together.id] = await isUserMember(together.id);
    }
    setUserMemberships(memberships);
  };

  const isUserMember = async (togetherId) => {
    if (!togetherId) {
      return false;
    } else {
      const response = await togetherService.checkMember(
        currentUser.id,
        togetherId
      );
      return response.data;
    }
  };

  const removeTogether = async (togetherId) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete) {
      await togetherService.removeTogether(togetherId);
      fetchData(); // 수정: 리스트 다시 불러오기
    }
  };

  const joinTogether = async (togetherId) => {
    await togetherMemberService.joinTogether(teamId, togetherId);
    alert("참가완료!");
    fetchData(); // 수정: 리스트 다시 불러오기
  };

  const cancelTogether = async (togetherId) => {
    const confirmCancel = window.confirm("모임참가를 취소 하시겠습니까?");
    if (confirmCancel) {
      await togetherMemberService.cancelTogether(togetherId);
      fetchData(); // 수정: 리스트 다시 불러오기
    }
  };

  const getTogetherMember = async (togetherId) => {
    try {
      const members = await togetherMemberService.getTogetherMember(togetherId);

      setMembers(members);

      toggleSelectedTogether(togetherId);
    } catch (error) {
      console.error("멤버 불러오는데 실패함:", error);
    }
  };

  // 드롭다운버튼
  const toggleSelectedTogether = (togetherId) => {
    setSelectedTogether((prevSelected) =>
      prevSelected === togetherId ? null : togetherId
    );
  };

  console.log(members);

  return (
    <div>
      <h4>모임</h4>
      {currentUser.id === hostId ? (
        <Link to={`/together/create/${teamId}`} className="btn btn-primary">
          모임생성
        </Link>
      ) : null}
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>장소</th>
            <th>설명</th>
            <th>날짜</th>
            {currentUser.id === hostId ? null : <th>신청</th>}
            {currentUser.id === hostId ? <th>관리</th> : null}
          </tr>
        </thead>
        <tbody>
          {togethers.map((together, index) => (
            <tr key={together.id}>
              <td>{index + 1}</td>
              <td>{together.title}</td>
              <td>{together.location}</td>
              <td>{together.togetherDep}</td>
              <td>{together.date}</td>
              {currentUser.id !== hostId ? (
                <td>
                  {userMemberships[together.id] ? (
                    <Button
                      className="btn-danger ms-1"
                      onClick={() => {
                        cancelTogether(together.id);
                      }}
                    >
                      취소
                    </Button>
                  ) : (
                    <Button onClick={() => joinTogether(together.id)}>
                      신청
                    </Button>
                  )}
                </td>
              ) : null}

              <td>
                {currentUser.id === hostId ? (
                  <>
                    <Button
                      className="btn-danger me-1"
                      onClick={() => removeTogether(together.id)}
                    >
                      삭제
                    </Button>
                    <Link
                      to={`together/edit/${together.id}`}
                      className="btn btn-primary me-1"
                    >
                      수정
                    </Link>

                    {/* 드롭다운 */}
                    {/* <DropdownButton
                      id={`dropdownButton${together.id}`}
                      title="멤버 리스트"
                      show={selectedTogether === together.id}
                      onClick={() => getTogetherMember(together.id)}
                    > */}
                    {/* 멤버 리스트 */}
                    {/* {members.map((member) => (
                        <Dropdown.Item
                          key={member.id}
                          className="dropdown-item"
                        >
                          {member.userId}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton> */}
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
