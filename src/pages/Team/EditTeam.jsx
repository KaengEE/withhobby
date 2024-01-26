import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import teamService from "../../services/team.service";
import { storage } from "../../firebase";
import categoryService from "../../services/category.service";
import TeamForm from "../../models/TeamForm";

const EditTeam = () => {
  const { teamId } = useParams();
  const [teamTitle, setTeamTitle] = useState("");
  const [teamName, setTeamName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [existingImgUrl, setExistingImgUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await teamService.getTeamDetail(teamId);
        const teamData = response.data;
        setTeamName(teamData.teamname);
        setTeamTitle(teamData.teamTitle);
        setCategory(teamData.category);
        setExistingImgUrl(teamData.teamImg);
      } catch (error) {
        console.error("팀정보 출력실패:", error);
      }
    };

    //카테고리
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getList();
        setCategories(response.data);
      } catch (error) {
        console.error("카테고리를 불러오는데 오류 발생:", error);
      }
    };

    fetchCategories();
    fetchTeamData();
  }, [teamId]);

  const handleUpdateTeam = async (e) => {
    e.preventDefault();

    // 입력값을 유효성 검사합니다.
    if (!teamTitle || !teamName) {
      console.error("팀 제목을 입력하세요.");
      return;
    }

    try {
      let teamImg = existingImgUrl;

      // 새로운 이미지가 선택되었는지 확인
      if (file) {
        // 파일 크기 체크
        if (file.size > 1000 * 1000) {
          console.error("이미지 사이즈는 1MB 이하로 해주세요.");
          return;
        }

        const locationRef = ref(storage, `teamImages/${file.name}`);
        const result = await uploadBytes(locationRef, file);
        teamImg = await getDownloadURL(result.ref);
      }

      const updatedTeam = new TeamForm(
        teamName,
        teamTitle,
        teamImg,
        category.category
      );

      await teamService.updateTeam(teamId, updatedTeam);

      // 이전 페이지로 이동
      navigate(`/team/detail/${teamId}`);
    } catch (error) {
      console.error("팀 수정 중 오류 발생:", error);
    }
  };

  return (
    <div
      className="container mt-5 border rounded p-4 shadow"
      style={{ maxWidth: "800px" }}
    >
      <div className="container mt-4">
        <h2>팀 수정하기</h2>
        <Form className="mt-3" onSubmit={handleUpdateTeam}>
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

          <Form.Group controlId="teamName">
            <Form.Label>팀 이름</Form.Label>
            <Form.Control
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="teamTitle">
            <Form.Label>팀 제목</Form.Label>
            <Form.Control
              type="text"
              value={teamTitle}
              onChange={(e) => setTeamTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="teamImg">
            <Form.Label>팀 대표사진</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Form.Group>

          <div className="text-end mt-4">
            <Button
              variant="danger"
              type="button"
              className="me-2"
              onClick={() => navigate(`/team/detail/${teamId}`)}
            >
              취소
            </Button>
            <Button variant="primary" type="submit">
              수정 완료
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditTeam;
