import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container my-5">
      <h3>로그인</h3>
      <form className="mt-5">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            아이디
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            비밀번호
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="form-text mb-3">
          아이디가 없을 경우 → <Link to="/join">회원가입</Link>
        </div>
        <button type="submit" className="btn btn-primary">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;