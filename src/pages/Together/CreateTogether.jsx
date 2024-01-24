import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import togetherService from "../../services/together.service";

const CreateTogether = () => {
  const { teamId } = useParams();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [togetherDep, setTogetherDep] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleCreateTogether = async (e) => {
    e.preventDefault();

    const togetherData = {
      title: title,
      location: location,
      togetherDep: togetherDep,
      date: date,
    };
    try {
      await togetherService.createTogether(teamId, togetherData);
      navigate(`/team/detail/${teamId}`);
    } catch (error) {
      console.error("Error creating Together:", error);
    }
  };

  return (
    <div className="container my-4">
      <h4 className="mb-3">모임생성</h4>
      <Form onSubmit={handleCreateTogether}>
        <Form.Group controlId="formTitle">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="모임명을 설정해주세요"
          />
        </Form.Group>

        <Form.Group controlId="formLocation">
          <Form.Label>장소</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="지역을 적어주세요"
          />
        </Form.Group>

        <Form.Group controlId="formTogetherDep">
          <Form.Label>설명</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={togetherDep}
            onChange={(e) => setTogetherDep(e.target.value)}
            placeholder="설명을 적어주세요"
          />
        </Form.Group>

        <Form.Group controlId="formDate">
          <Form.Label>모임 날짜</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <div className="text-end">
          <Button
            className="btn btn-danger mt-3 me-2"
            onClick={() => {
              navigate(`/team/detail/${teamId}`);
            }}
          >
            취소
          </Button>
          <Button type="submit" className="btn btn-primary mt-3">
            생성하기
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateTogether;
