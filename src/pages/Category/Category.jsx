import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import img from "../../assets/sample.jpg";
import { Link } from "react-router-dom";
import categoryService from "../../services/category.service";

const Category = () => {
  const [category, setCategory] = useState([]); //카테고리 리스트

  useEffect(() => {
    // 컴포넌트가 마운트되면 카테고리 리스트를 불러오기
    const categoryList = async () => {
      try {
        const response = await categoryService.getList();
        setCategory(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("리스트를 가져오는데 오류 발생:", error);
      }
    };

    categoryList();
  }, []);

  return (
    <div className="container mt-4">
      <h2>카테고리</h2>
      {/* ROLE ADMIN에게만 보이게하기 */}
      <div className="text-end mx-3">
        <Link to="/create" className="btn btn-primary mb-3">
          카테고리 추가
        </Link>
      </div>
      <div className="d-flex flex-wrap gap-3 mt-3">
        {/* 카테고리 리스트 */}
        {category.map((categoryItem) => (
          <Card key={categoryItem.id} style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{categoryItem.category}</Card.Title>
              <div className="text-end">
                {/* 링크 또는 버튼에 대한 작업 수행 */}
                <Link
                  to={`/team/${categoryItem.id}`}
                  className="btn btn-primary"
                >
                  바로가기
                </Link>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Category;
