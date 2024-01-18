import React from "react";
import { Button, Card } from "react-bootstrap";
import img from "../../assets/sample.jpg";

const TeamList = () => {
  return (
    <div className="container mt-4">
      <Button to="/category"> ◀ 이전 페이지</Button>
      <h2 className="mt-4">그림</h2>
      <div className="d-flex flex-wrap gap-3 mt-3">
        {/* 카테고리 테이블 데이터 출력 */}
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>그림</Card.Title>
            <div className="text-end">
              <Button variant="primary">바로가기</Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>그림</Card.Title>
            <div className="text-end">
              <Button variant="primary">바로가기</Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>그림</Card.Title>
            <div className="text-end">
              <Button variant="primary">바로가기</Button>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>그림</Card.Title>
            <div className="text-end">
              <Button variant="primary">바로가기</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default TeamList;
