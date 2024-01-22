import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import img from "../../assets/sample.jpg";
import teamService from "../../services/team.service";
import { Link, useParams } from "react-router-dom";
import categoryService from "../../services/category.service";

const TeamList = () => {
  const { categoryId } = useParams();
  const [teamList, setTeamList] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  //카테고리 이름
  const getCategoryName = async (categoryId) => {
    const response = await categoryService.getCategoryName(categoryId);
    setCategoryName(response.data);
  };

  useEffect(() => {
    const fetchTeamList = async () => {
      try {
        const response = await teamService.getListByCategory(categoryId);
        getCategoryName(categoryId);
        setTeamList(response.data);
      } catch (error) {
        console.error("팀 리스트를 가져오는데 오류 발생:", error);
      }
    };

    fetchTeamList();
  }, [categoryId]);

  //console.log(categoryId);

  return (
    <div className="container mt-4">
      <Link to="/category"> ◀ 이전 페이지</Link>
      <h2 className="mt-4">{categoryName}</h2>
      <div className="text-end my-3">
        <Link to="/team/create" className="btn btn-info">
          팀 만들기
        </Link>
      </div>
      {teamList.length === 0 ? (
        <p>아직 팀이 없습니다.</p>
      ) : (
        <div className="d-flex flex-wrap gap-3 mt-3">
          {teamList.map((teamItem) => (
            <Card key={teamItem.id} style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={teamItem.teamImg}
                className="w-100 h-50"
              />

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
      )}
    </div>
  );
};

export default TeamList;
