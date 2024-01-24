import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="mt-5 p-5 bg-light">
      <Container>
        <Row>
          <Col className="text-center">
            <p>© 2024 KaengEE. All rights reserved.</p>
            <a href="" className="btn btn-outline-dark me-3">
              GitHub
            </a>
            <a href="" className="btn btn-outline-success">
              Portfolio
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
