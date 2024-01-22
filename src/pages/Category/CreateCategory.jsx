import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import categoryService from "../../services/category.service";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleCreateCategory = async () => {
    try {
      const response = await categoryService.createCategory(categoryName);
      console.log("카테고리 생성 성공:", response.data);
      navigate("/category");
    } catch (error) {
      console.error("카테고리 생성 실패:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-3">카테고리 생성</h3>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>카테고리 이름:</Form.Label>
          <Form.Control
            type="text"
            placeholder="카테고리명"
            value={categoryName}
            onChange={handleCategoryNameChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleCreateCategory}>
          생성
        </Button>
      </Form>
    </div>
  );
};

export default CreateCategory;
