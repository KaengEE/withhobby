import React from "react";
import { Link, useParams } from "react-router-dom";

const Together = () => {
  const { teamId } = useParams();
  return (
    <div>
      <h4>모임</h4>
      <Link to={`/together/create/${teamId}`} className="btn btn-primary">
        모임생성
      </Link>
      {/* 모임리스트 - 테이블 형식 */}
    </div>
  );
};

export default Together;
