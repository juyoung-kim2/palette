import { Link } from "react-router-dom";

function SideMenu({ menuOpen, closeMenu }) {
  return (
    <div className={` sideMenu ${menuOpen ? "open" : ""}`}>
      <div className="menu-dim" onClick={closeMenu}></div>
      <nav className="mobile-menu">
        <div className="menu-container">
          <div className="menu-header">
            <button className="btn-close" onClick={closeMenu}>
              <img src="images/icon_close.png" alt="닫기" />
            </button>
            <img src="images/logo.png" alt="팔레트 로고" />
            <p className="user-name">
              안녕하세요, <span>사용자</span>님 :)
            </p>
          </div>

          <ul className="menu-list primary">
            <li>
              {/* /mypage 는 그대로 유지 */}
              <Link to="/mypage" onClick={closeMenu}>
                마이페이지
              </Link>
            </li>
            <li>
              {/* /mypageOrderList -> /mypage-order-list 로 변경 */}
              <Link to="/mypage-order-list" onClick={closeMenu}>
                주문내역
              </Link>
            </li>
            <li>
              {/* /cart 는 그대로 유지 */}
              <Link to="/cart" onClick={closeMenu}>
                장바구니
              </Link>
            </li>
            <li>
              {/* /mypageQnaList -> /mypage-qna-list 로 변경 */}
              <Link to="/mypage-qna-list" onClick={closeMenu}>
                1:1 문의
              </Link>
            </li>
            <li className="point">
              {/* /order 는 그대로 유지 */}
              <Link to="/order" onClick={closeMenu}>
                케이크 제작하기
              </Link>
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
