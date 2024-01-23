import React, { useEffect, useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import categoryService from "../../services/category.service";
import teamService from "../../services/team.service";
import { storage } from "../../firebase";
import TeamForm from "../../models/TeamForm";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditTeam = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState();
  const [teamName, setTeamName] = useState("");
  const [teamTitle, setTeamTitle] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getList();
        setCategories(response.data);
      } catch (error) {
        console.error("카테고리를 불러오는데 오류 발생:", error);
      }
    };

    fetchData();
    fetchCategories();
  }, []);

  // 기존 팀 데이터 불러오기
  const fetchData = async () => {
    try {
      const teamData = await teamService.getTeamDetail(teamId);
      setTeam(teamData.data);
      console.log(teamData.data);
    } catch (error) {
      console.error("팀 데이터를 불러오는데 오류 발생:", error);
    }
  };

  const handleUpdateTeam = async () => {
    // 입력값을 유효성 검사합니다.
    if (!teamName || !teamTitle || !category) {
      setError("모든 내용을 입력하세요.");
      return;
    }

    try {
      // 새로운 이미지가 선택되었는지 확인
      let teamUrl = team?.teamImg || "";
      if (file) {
        // 파일 크기 체크
        if (file.size > 1000 * 1000) {
          setError("이미지 사이즈는 1MB 이하로 해주세요.");
          return;
        }

        // 이미지 업로드시 참조주소
        const locationRef = ref(storage, `teamImages/${file.name}`);
        // 이미지 파일 업로드
        const result = await uploadBytes(locationRef, file);
        // db에 입력할 주소
        teamUrl = await getDownloadURL(result.ref);
      }

      // 팀 수정
      const teamForm = new TeamForm(teamName, teamTitle, teamUrl, category);
      await teamService.updateTeam(teamId, teamForm);

      // 이전 페이지로 이동
      navigate(-1);
    } catch (error) {
      console.error("팀 수정 중 오류 발생:", error);
      setError("팀 수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mt-3">
      <h3 className="">팀 수정하기</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>카테고리 선택</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              선택하세요
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>팀 이름</Form.Label>
          <Form.Control
            type="text"
            placeholder={team?.teamname}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>팀 제목</Form.Label>
          <Form.Control
            type="text"
            placeholder={team?.teamTitle}
            value={teamTitle}
            onChange={(e) => setTeamTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>팀 대표사진</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button variant="danger" onClick={() => navigate(-1)}>
            취소
          </Button>
          <Button variant="primary" onClick={handleUpdateTeam}>
            수정
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditTeam;
