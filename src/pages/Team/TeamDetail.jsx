import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import teamService from "../../services/team.service";
import { useSelector } from "react-redux";
import { Button, Image, Container, Row, Col, Accordion } from "react-bootstrap";
import memberService from "../../services/member.service";
import Together from "../Together/Together";

const TeamDetail = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState();
  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [member, setMember] = useState([]);
  const [teamHost, setTeamHost] = useState();


  //비회원 유저 접근시 로그인 페이지로
  useEffect(() => {
    if (!currentUser) {
      alert("로그인 해주세요!");
      navigate("/login");
    }
  }, [currentUser, navigate]);

  
  const fetchMemberList = async () => {
    try {
      const response = await memberService.getMember(teamId);
      setMember(response.data);
    } catch (error) {
      console.error("팀 멤버를 불러오는데 오류 발생:", error);
    }
  };

  useEffect(() => {
    const fetchTeamDetail = async () => {
      try {
        const response = await teamService.getTeamDetail(teamId);
        const hostId = response.data.teamHost.id;
        setTeamHost(hostId);
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
      alert(response.data);
      fetchMemberList();
    } catch (error) {
      console.error("가입실패:", error);
      if (error.response && error.response.data) {
        const errorMessage = error.response.data;
        alert(`가입 실패: ${errorMessage}`);
      }
    }
  };

  const handleRemoveMember = async () => {
    const confirm = window.confirm("정말로 탈퇴하시겠습니까?");

    if (confirm) {
      const isCurrentUserMember = member.some(
        (m) => m.username === currentUser.username
      );

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
    <Container>
      <Row className="mt-3">
        <Col>
          <Button onClick={() => navigate(-1)} variant="outline-secondary">
            이전으로
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Image src={team?.teamImg} alt="팀 이미지" fluid />
        </Col>
        <Col>
          <h3>{team?.teamname}</h3>
          <h5>{team?.teamTitle}</h5>
          <p>Host: {team?.teamHost.name}</p>
          <Button onClick={handleJoinTeam} variant="primary" className="mr-2">
            가입
          </Button>
          {member.some((m) => m.username === currentUser.username) && (
            <Button onClick={handleRemoveMember} variant="danger">
              탈퇴
            </Button>
          )}
          {currentUser && currentUser.id === team?.teamHost.id && (
            <Link
              to={`/team/update/${teamId}`}
              className="btn btn-outline-secondary ml-2"
            >
              수정
            </Link>
          )}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          {member.length > 0 ? (
            <div className="container">
              <Accordion
                defaultActiveKey="1"
                className="ms-auto"
                style={{ width: "300px" }}
              >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>팀멤버</Accordion.Header>
                  <Accordion.Body>
                    {/* 멤버 리스트 */}
                    <ul>
                      {member.map((m) => (
                        <li key={m.id}>{m.username}</li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          ) : (
            <p>아직 멤버가 없습니다.</p>
          )}
        </Col>
      </Row>
      {/* 모임 */}
      <Together teamId={teamId} hostId={teamHost} />
    </Container>
  );
};

export default TeamDetail;
