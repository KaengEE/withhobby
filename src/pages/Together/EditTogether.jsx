import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import togetherService from "../../services/together.service";
import { Button, Form } from "react-bootstrap";

const EditTogether = () => {
  const { teamId, togetherId } = useParams();
  const navigate = useNavigate();

  const [together, setTogether] = useState({
    title: "",
    location: "",
    togetherDep: "",
    date: "",
  });

  useEffect(() => {
    // 모임 정보 불러오기
    const fetchTogetherInfo = async () => {
      try {
        const response = await togetherService.getTogetherDetail(togetherId);
        setTogether(response.data);
      } catch (error) {
        console.error("모임 정보 불러오기 실패:", error);
      }
    };

    fetchTogetherInfo();
  }, [teamId, togetherId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTogether((prevTogether) => ({
      ...prevTogether,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // 모임 정보 업데이트
    try {
      await togetherService.updateTogether(togetherId, together);
      alert("모임 정보가 성공적으로 업데이트되었습니다.");
      // 업데이트 후 모임 상세 페이지로 이동ㄴ
      navigate(`/team/detail/${teamId}`);
    } catch (error) {
      console.error("수정실패:", error);
    }
  };

  return (
    <div>
      <h4>모임 수정</h4>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={together.title}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>장소</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={together.location}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>설명</Form.Label>
          <Form.Control
            as="textarea"
            name="togetherDep"
            value={together.togetherDep}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>날짜</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={together.date}
            onChange={handleInputChange}
          />
        </Form.Group>

        <div className="text-center">
          <Button
            onClick={() => {
              navigate(-1);
            }}
            className="btn-danger me-1"
          >
            취소
          </Button>
          <Button type="submit">수정</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditTogether;
