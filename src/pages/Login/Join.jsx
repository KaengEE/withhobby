import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../../models/User";
import { useSelector } from "react-redux";
import { registerService } from "../../services/auth.service";

const Join = () => {
  const [user, setUser] = useState(new User("", "", ""));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //useSelector로 store의 유저객체를 가져온다.
  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    //시작시 유저의 id가 있으면 profile페이지로 이동
    if (currentUser?.id) {
      navigate("/join");
    }
  }, []);

  //입력이벤트
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  //가입하기 submit 이벤트
  const handleRegister = (e) => {
    e.preventDefault();
    setSubmitted(true); //submit하면 true가 됨 => 부트스트랩 유효성 검사 시작

    if (!user.username || !user.password || !user.name) {
      return;
    }

    setLoading(true);

    registerService(user)
      //성공시 로그인페이지
      .then((ok) => {
        navigate("/login");
      })
      //실패시 에러메시지표시
      .catch((error) => {
        //console.log(error);
        if (error?.response?.status === 409) {
          setErrorMessage("같은 유저네임이 있습니다.");
        } else {
          setErrorMessage("예상하지 못한 에러가 발생했습니다.");
        }

        setLoading(false);
      });
  };
  return (
    <div className="container my-5">
      <h3 className="mb-5">회원가입</h3>
      {/* 에러메시지 */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {/* 회원가입 폼 */}
      <form
        className={submitted ? "was-validated" : ""}
        onSubmit={handleRegister}
        noValidate
      >
        <div className=" form-group mb-3">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="이름"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="invalid-feedback">이름을 입력해주세요</div>

        <div className="form-group mb-3">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={user.username}
            placeholder="아이디"
            onChange={handleChange}
            required
          />
        </div>
        <div className="invalid-feedback">아이디를 입력해주세요</div>

        <div className="form-group mb-3">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="비밀번호"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-text mb-3">
          아이디가 있을 경우 → <Link to="/login">로그인</Link>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Join;
