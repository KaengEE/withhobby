import React, { useEffect, useState } from "react";
import banner from "../../assets/banner.gif";
import "./Home.css";
import { Link } from "react-router-dom";
import teamService from "../../services/team.service";
import { Button, Card, Col, Row } from "react-bootstrap";

const Home = () => {
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    fetchTeamList();
  }, []);

  //팀리스트 가져오기
  const fetchTeamList = async () => {
    try {
      const response = await teamService.getTeamList();
      const latestTeams = response.data.slice(0, 8); //8개가져오기
      setTeamList(latestTeams);
    } catch (error) {
      console.error("팀 리스트를 가져오는데 오류 발생:", error);
    }
  };

  return (
    <div className="container text-center mt-1">
      <div className="position-relative">
        <img src={banner} alt="Banner" className="banner-image" />
        <Link to="/category" className="btn btn-on-image">
          팀 만들기
        </Link>
      </div>
      {/* 팀리스트 출력 */}
      <div className="mt-4">
        <h5 className="main-title mb-4">여긴 어때?</h5>
        <div className="card-container">
          <Row className="g-4">
            {teamList.map((team) => (
              <Col key={team.id} xs={12} sm={6} md={4} lg={3}>
                <Card className="mb-3">
                  <Card.Img
                    variant="top"
                    src={team.teamImg}
                    alt={team.teamname}
                  />
                  <Card.Body>
                    <Card.Title>{team.teamname}</Card.Title>
                    <Card.Text>{team.teamTitle}</Card.Text>
                    <Link to={`/team/detail/${team.id}`}>
                      <Button variant="primary">자세히 보기</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;
