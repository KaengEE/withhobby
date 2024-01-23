import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import teamService from "../../services/team.service";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const TeamDetail = () => {
  const { teamId } = useParams(); // 비구조화 할당
  const [team, setTeam] = useState();
  const currentUser = useSelector((state) => state.user); //현재유저
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamDetail = async () => {
      try {
        const response = await teamService.getTeamDetail(parseInt(teamId, 10));
        setTeam(response.data);
      } catch (error) {
        console.error("팀 정보를 불러오는데 오류 발생:", error);
      }
    };

    fetchTeamDetail();
  }, [teamId]);

  // console.log(team);
  // console.log(team?.teamHost.id);
  // console.log(currentUser);

  // teamId로 team 내용 조회하기
  return (
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
      {/* 현재유저와 hostId가 같아야 수정가능 */}
      {currentUser.id == team?.teamHost.id && (
        <Link to={`/team/update/${teamId}`}>수정</Link>
      )}
    </div>
  );
};

export default TeamDetail;
