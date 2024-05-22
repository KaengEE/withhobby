import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-5 p-5 bg-light">
      <Container>
        <Row>
          <Col className="text-center">
            <p>© 2024 KaengEE. All rights reserved.</p>
            <a href="https://github.com/KaengEE/withhobby" target="_blank" className="btn btn-outline-dark me-3">
              GitHub
            </a>
            <a href="https://drive.google.com/file/d/1aiIymoxbxMPnyiAbkjHHKUJqIuZtBJn_/view" target="_blank" className="btn btn-outline-success">
              Portfolio
            </a>
          </Col>
        </Row>
        <p className="text-center p-3">
        <NavLink to="/admin" className="nav-link">
                  관리자페이지
        </NavLink>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
