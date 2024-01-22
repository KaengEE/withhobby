import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import teamService from "../../services/team.service";

const TeamDetail = () => {
  const { teamId } = useParams(); // 비구조화 할당
  const [team, setTeam] = useState();

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

  console.log(team);

  // teamId로 team 내용 조회하기
  return (
    <div>
      <img src={team?.teamImg} alt="팀 이미지" />
      <h3>{team?.teamname}</h3>
      <h5>{team?.teamTitle}</h5>
      <div>
        <p>Host: {team?.teamHost.name}</p>
      </div>
    </div>
  );
};

export default TeamDetail;
