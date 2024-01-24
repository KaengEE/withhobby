import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import User from "../../models/User";
import { useDispatch, useSelector } from "react-redux";
import { loginService } from "../../services/auth.service";
import { setCurrentUser } from "../../store/actions/user";

const Login = () => {
  const [user, setUser] = useState(new User("", ""));
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.id) navigate("/mypage");
  }, []);

  //입력메서드
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(name, value);
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  //로그인메서드 submit
  const handleLogin = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!user.username || !user.password) {
      return;
    }

    setLoading(true);

    loginService(user)
      .then((response) => {
        // setCurrentUser로 만든 액션을 유저 리듀서에 전달
        dispatch(setCurrentUser(response.data));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("유저네임 또는 패스워드가 틀립니다.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container my-5">
      <h3 className="mt-5">로그인</h3>
      {/* 오류메시지 */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {/* 로그인폼 */}
      <form
        onSubmit={handleLogin}
        noValidate
        className={submitted ? "was-validated" : ""}
      >
        <div className="form-group mb-3">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="아이디"
            value={user.username}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">아이디를 입력해주세요</div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">패스워드를 입력해주세요</div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          로그인
        </button>
        <div className="form-text mt-3">
          아이디가 없을 경우 → <Link to="/join">회원가입</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
