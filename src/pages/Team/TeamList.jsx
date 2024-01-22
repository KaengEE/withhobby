import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import img from "../../assets/sample.jpg";
import teamService from "../../services/team.service";
import { Link, useParams } from "react-router-dom";

const TeamList = () => {
  const { categoryId } = useParams();
  const [teamList, setTeamList] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchTeamList = async () => {
      try {
        const response = await teamService.getListByCategory(categoryId);
        setTeamList(response.data);

        // 카테고리 정보를 가져와 categoryName state에 저장
        if (response.data.length > 0) {
          setCategoryName(response.data[0].category.category);
        }
      } catch (error) {
        console.error("팀 리스트를 가져오는데 오류 발생:", error);
      }
    };

    fetchTeamList();
  }, [categoryId]);

  //console.log(teamList);

  return (
    <div className="container mt-4">
      <Link to="/category"> ◀ 이전 페이지</Link>
      <h2 className="mt-4">{categoryName}</h2>
      <div className="d-flex flex-wrap gap-3 mt-3">
        {teamList.map((teamItem) => (
          <Card key={teamItem.id} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={img} />
            <Card.Body>
              <Card.Title>{teamItem.teamname}</Card.Title>
              <Card.Text>{teamItem.teamTitle}</Card.Text>
              <div className="text-end">
                <Card.Text>HOST :{teamItem.teamHost.username}👑</Card.Text>
                <Button variant="primary">바로가기</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
