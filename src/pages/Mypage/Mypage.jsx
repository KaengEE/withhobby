import React from "react";
import { Button, Card } from "react-bootstrap";
import img from "../../assets/sample.jpg";

const Mypage = () => {
  return (
    <div className="container mt-5">
      <div className="container">
        <Card className="text-center">
          <div className="circle-avatar mt-3">
            <img
              src={img}
              className="rounded-circle"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
          <Card.Body>
            <Card.Title>User Name</Card.Title>
            <Card.Text>👑 그림동호회 HOST</Card.Text>
            <Button variant="primary">프로필 수정</Button>
          </Card.Body>
        </Card>
        <Card className="mt-5">
          <Card.Body>
            <Card.Title>Profile Information</Card.Title>
            <Card.Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              quam velit, vulputate eu pharetra nec, mattis ac neque. Duis
              vulputate commodo lectus, ac blandit elit tincidunt id.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Mypage;
