import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentUser } from "../store/actions/user";

const Navbar = () => {
  const currentUser = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //로그아웃
  const logout = () => {
    dispatch(clearCurrentUser());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/favicon.ico"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top me-1"
          />
          With Hobby
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/category" className="nav-link">
                카테고리
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/post" className="nav-link">
                자유게시판
              </NavLink>
            </li>
            {/* 비로그인 */}
            {!currentUser && (
              <>
                <li className="nav-item">
                  <NavLink to="/join" className="nav-link">
                    회원가입
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    로그인
                  </NavLink>
                </li>
              </>
            )}
            {/* 로그인 */}
            {currentUser && (
              <>
                <li className="nav-item">
                  <NavLink to="/mypage" className="nav-link">
                    마이페이지
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={logout}>
                    로그아웃
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
