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
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                카테고리
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                자유게시판
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                회원가입
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                로그인
              </a>
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
