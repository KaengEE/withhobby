import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import teamService from "../../services/team.service";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import memberService from "../../services/member.service";

const TeamDetail = () => {
  const { teamId } = useParams(); // 비구조화 할당
  const [team, setTeam] = useState();
  const currentUser = useSelector((state) => state.user); //현재유저
  const navigate = useNavigate();
  const [member, setMember] = useState([]); //멤버리스트

  const fetchMemberList = async () => {
    try {
      const response = await memberService.getMember(teamId);
      setMember(response.data);
    } catch (error) {
      console.error("팀 리스트를 불러오는데 오류 발생:", error);
    }
  };

  useEffect(() => {
    const fetchTeamDetail = async () => {
      try {
        // teamId로 team 내용 조회하기
        const response = await teamService.getTeamDetail(teamId);
        setTeam(response.data);
      } catch (error) {
        console.error("팀 정보를 불러오는데 오류 발생:", error);
      }
    };

    fetchTeamDetail();
    fetchMemberList();
  }, [teamId]);

  const handleJoinTeam = async () => {
    try {
      const response = await memberService.joinTeam(teamId);
      //console.log(response.data);
      //console.log("Status Code:", response.status);
      alert(response.data);
      //가입후 리스트 다시 불러오기
      fetchMemberList();
    } catch (error) {
      console.error("가입실패:", error);
      if (error.response && error.response.data) {
        // 실패시 알림창
        const errorMessage = error.response.data;
        alert(`가입 실패: ${errorMessage}`);
      }
    }
  };

  //팀 탈퇴
  const handleRemoveMember = async () => {
    const confirm = window.confirm("정말로 탈퇴하시겠습니까?");
    
    if (confirm) {
      // 같은 유저여야 삭제
      const isCurrentUserMember = member.some((m) => m.username === currentUser.username);
  
      if (isCurrentUserMember) {
        try {
          await memberService.removeMember(teamId, currentUser.username);
          fetchMemberList();
          navigate(`/team/detail/${teamId}`);
        } catch (error) {
          console.error("멤버 삭제 중 에러 발생:", error);
        }
      } else {
        alert("현재 로그인한 유저와 삭제할 멤버의 유저가 일치하지 않습니다.");
      }
    }
  };

  return (
    <>
      <div>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          이전으로
        </Button>
        <img src={team?.teamImg} alt="팀 이미지" />
        <h3>{team?.teamname}</h3>
        <h5>{team?.teamTitle}</h5>
        <div>
          <p>Host: {team?.teamHost.name}</p>
        </div>
        {/* 팀 가입하기 */}
        <Button onClick={handleJoinTeam}>가입</Button>

        {/* 팀 탈퇴하기 - 팀멤버id와 자신의 id가 동일할때 보임 */}
        {member.some((m) => m.username === currentUser.username) && (
          <Button className="btn btn-danger" onClick={handleRemoveMember}>
            탈퇴
          </Button>
        )}

        {/* 현재유저와 hostId가 같아야 수정가능 */}
        {currentUser.id == team?.teamHost.id && (
          <Link to={`/team/update/${teamId}`}>수정</Link>
        )}
      </div>
      {/* 팀멤버 */}
      <div>
        <h4>팀 멤버</h4>
        {member.length > 0 ? (
          <ul>
            {member.map((members) => (
              <li key={members.id}>{members.username}</li>
            ))}
          </ul>
        ) : (
          <p>아직 멤버가 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default TeamDetail;
