import { Link } from "react-router-dom";

function SideMenu({ menuOpen, closeMenu }) {
  return (
    <div className={` sideMenu ${menuOpen ? "open" : ""}`}>
      <div className="menu-dim" onClick={closeMenu}></div>
      <nav className="mobile-menu">
        <div className="menu-container">
          <div className="menu-header">
            <button className="btn-close" onClick={closeMenu}>
              <img src="images/icon_close.png" alt="" />
            </button>
            <img src="images/logo.png" alt="" />
            <p className="user-name">
              안녕하세요, <span>사용자</span>님 :)
            </p>
          </div>

          <ul className="menu-list primary">
            <li>
              <Link to="/mypage">마이페이지</Link>
            </li>
            <li>
              <Link to="/mypageOrderList">주문내역</Link>
            </li>
            <li>
              <Link to="/cart">장바구니</Link>
            </li>
            <li>
              <Link to="/mypageQnaList">1:1 문의</Link>
            </li>
            <li className="point">
              <Link to="/order">케이크 제작하기</Link>
            </li>
          </ul>
          <button className="btn btn-gray">로그아웃</button>
          <p className="copy">palette ©</p>
        </div>
      </nav>
    </div>
  );
}

export default SideMenu;
