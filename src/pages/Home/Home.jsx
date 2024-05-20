import React, { useEffect, useState } from "react";
import banner from "../../assets/banner.gif";
import "./Home.css";
import { Link } from "react-router-dom";
import teamService from "../../services/team.service";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import postService from "../../services/post.service";

const Home = () => {
  const [teamList, setTeamList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [showModal, setShowModal] = useState(true); //모달 상태 추가

  //팀리스트 가져오기
  const fetchTeamList = async () => {
    try {
      const response = await teamService.getTeamList();
      const latestTeams = response.data.slice(0, 8); //8개 가져오기
      setTeamList(latestTeams);
    } catch (error) {
      console.error("팀 리스트를 가져오는데 오류 발생:", error);
    }
  };

  //게시글 리스트 가져오기
  const fetchPostList = async () => {
    try {
      const response = await postService.getPostList();
      const latestPost = response.data.slice(0, 5); //5개 가져오기
      setPostList(latestPost);
    } catch (error) {
      console.error("게시글 리스트를 가져오는데 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchTeamList();
    fetchPostList();

    //모달창 추가(10초)
    const timeout = setTimeout(() => {
      setShowModal(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="container text-center">
      {/* 모달창 */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>페이지 안내</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>죄송합니다.<br/>
          무료 서버를 사용해서 데이터 불러오는데 약 1분~2분 소요됩니다.<br/>
          관리자 아이디 hong 비밀번호 1234<br/>
          유저 아이디 peng 비밀번호 1234
          </p>
        </Modal.Body>
      </Modal>
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
                    className="card-img"
                    src={team.teamImg}
                    alt={team.teamname}
                  />
                  <Card.Body>
                    <Card.Title>{team.teamname}</Card.Title>
                    <Card.Text>{team.teamTitle}</Card.Text>
                    <Link to={`/team/detail/${team.id}`}>
                      <Button variant="primary" className="detail-btn">자세히 보기</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      {/* 게시글 리스트 출력 */}
      <div className="mt-4">
        <h5 className="main-title mb-4">자유게시판</h5>
        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody>
            {/* 게시글 목록을 반복하여 표시 */}
            {postList.map((post) => (
              <tr key={post.id}>
                <th scope="row">{post.id}</th>
                <td>
                  <Link to={`/post/detail/${post.id}`} className="link">
                    {post.postTitle}
                  </Link>
                </td>
                <td>{post.user.username}</td>
                <td>{new Date(post.createAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
