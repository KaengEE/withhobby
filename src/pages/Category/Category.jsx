import React from "react";
import { Button, Card } from "react-bootstrap";
import img from "../../assets/sample.jpg";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="container mt-4">
      <h2>카테고리</h2>
      <div className="d-flex flex-wrap gap-3 mt-3">
        {/* 카테고리 테이블 데이터 출력 */}
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={img} />
          <Card.Body>
            <Card.Title>그림</Card.Title>
            <div className="text-end">
              <Link to="/teamList" className="btn btn-primary">
                바로가기
              </Link>
            </div>
          </Card.Body>
        </Card>
        {/* 반복문으로처리 */}
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

export default Category;
