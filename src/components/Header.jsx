import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

const getCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cartData")) || [];
  return cart.length;
};

function Header({ variant, openMenu }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [cartCount, setCartCount] = useState(getCartCount);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeBanner = () => {
    setBannerOpen(false);
  };

  const updateCount = () => {
    setCartCount(getCartCount());
  };

  useEffect(() => {
    window.addEventListener("cartUpdate", updateCount);
    return () => window.removeEventListener("cartUpdate", updateCount);
  }, []);

  return (
    <header className={`header ${variant} ${isScrolled ? "is-scrolled" : ""}`}>
      {variant === "main" && (
        <>
          <div className={`header-top ${bannerOpen ? "" : "remove"}`}>
            <div className="top-inner">
              <p>회원가입 후 팔레트의 이벤트를 확인하세요!</p>
              <button className="btn-close" onClick={closeBanner}>
                <img src="/images/icon_close.png" alt="close" />
              </button>
            </div>
          </div>

          <div className="header_inner">
            <Link to="/" className="header-logo">
              <img
                src="/images/logo-w.png"
                alt="팔레트 로고"
                className="logo-w"
              />
              <img
                src="/images/logo.png"
                alt="팔레트 로고"
                className="logo-b"
              />
            </Link>

            <div className="header-right">
              <Link to="/cart" className="icon">
                <img src="/images/icon-cart-w.png" alt="장바구니 아이콘" />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
              {/* 마이페이지 링크 */}
              <Link to="/mypage" className="icon">
                <img src="/images/icon-user-w.png" alt="마이페이지 아이콘" />
              </Link>
              <button
                type="button"
                className="menu-btn icon"
                aria-expanded="false"
                aria-label="모바일 메뉴 열기"
                onClick={openMenu}
              >
                <img
                  className="icon"
                  src="/images/icon-menu-w.png"
                  alt="메뉴 아이콘"
                />
              </button>
            </div>
          </div>
        </>
      )}

      {variant === "sub" && (
        <div className="header_inner">
          <div className="header-container">
            <div className="header-left">
              <button
                type="button"
                style={{ border: 0, background: "none" }}
                className="icon"
                onClick={() => navigate(-1)}
              >
                <img src="/images/icon_arrow_l.png" alt="뒤로가기" />
              </button>
              <Link to="/" className="icon">
                <img src="/images/icon-home.png" alt="홈 아이콘" />
              </Link>
            </div>

            <div className="header-right">
              <Link to="/cart" className="icon">
                <img src="/images/icon_cart.png" alt="장바구니 아이콘" />
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
              <Link to="/mypage" className="icon">
                <img src="/images/icon_user.png" alt="마이페이지 아이콘" />
              </Link>
              <button
                type="button"
                className="menu-btn icon"
                onClick={openMenu}
              >
                <img src="/images/icon_menu.png" alt="메뉴 아이콘" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
