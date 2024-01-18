import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="/vite.svg"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
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
              <a className="nav-link" href="#">
                카테고리
              </a>
            </li>
            <li className="nav-item">
              <NavLink to="/post" className="nav-link">
                자유게시판
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                회원가입
              </a>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                로그인
              </NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                마이페이지
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                로그아웃
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
