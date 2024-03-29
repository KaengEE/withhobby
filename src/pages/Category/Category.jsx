import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import categoryService from "../../services/category.service";
import { useSelector } from "react-redux";

const Category = () => {
  const [category, setCategory] = useState([]); //카테고리 리스트
  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // 카테고리 리스트를 불러오기
    const fetchCategoryList = async () => {
      try {
        // 로그인 유저가 있으면
        if (currentUser && currentUser?.role) {
          const response = await categoryService.getList();
          // id 오름차순
          const sortedCategories = response.data.sort((a, b) => a.id - b.id);
          setCategory(sortedCategories);
          // console.log(response.data);
        } else {
          //없으면 페이지이동
          navigate("/login");
        }
      } catch (error) {
        console.error("리스트를 가져오는데 오류 발생:", error);
      }
    };

    fetchCategoryList();
  }, []);

  if (!currentUser) {
    alert("로그인해주세요!");
    return null;
  }

  return (
    <div className="container mt-4">
      <h2>카테고리</h2>
      {/* ROLE ADMIN에게만 보이게하기 */}
      {currentUser.role == "ADMIN" && (
        <div className="text-end mx-3">
          <Link to="/createCategory" className="btn btn-primary mb-3">
            카테고리 추가
          </Link>
        </div>
      )}

      {category.length === 0 ? (
        <p>카테고리 없음</p>
      ) : (
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
      )}
    </div>
  );
};

export default Category;
