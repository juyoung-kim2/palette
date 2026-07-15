import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./SideMenu.css";
function SideMenu({ menuOpen, closeMenu }) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const menu = menuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll(
      'button, a, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    setTimeout(() => first?.focus(), 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, closeMenu]);
  return (
    <div
      className={` sideMenu ${menuOpen ? "open" : ""}`}
      aria-hidden={!menuOpen}
    >
      <div
        className="menu-dim"
        role="button"
        tabIndex={menuOpen ? 0 : -1}
        aria-label="메뉴 닫기"
        onClick={closeMenu}
        onKeyDown={(e) => e.key === "Enter" && closeMenu()}
      ></div>
      <nav className="mobile-menu" aria-label="모바일 네비게이션" ref={menuRef}>
        <div className="menu-container">
          <div className="menu-header">
            <button
              className="btn-close"
              onClick={closeMenu}
              aria-label="모바일 메뉴 닫기"
            >
              <img src="/images/icon_close.png" alt="" />
            </button>
            <img src="/images/logo.svg" alt="팔레트 로고" />
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
