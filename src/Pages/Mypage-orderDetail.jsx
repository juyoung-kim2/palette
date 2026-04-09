import "../style.css";
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function MypageOrderDetail() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const openMenu = (e) => {
    e.preventDefault();
    setMenuOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  return (
    <div className="content-wrapper">
      <div id="leftBanner">
        <LeftBanner />
      </div>

      <main className="mypage-section main-section">
        <Header variant="sub" openMenu={openMenu} />
        <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />
        <section className="mypage-container sub-container is-empty">
          <h1>주문상세내역</h1>
          <div className="order-info">
            {/*주문 기본 정보*/}
            <div className="order-section">
              <h3 className="section-title">
                주문 정보
                <img
                  src="/images/icon_arrow_b.png"
                  alt="화살표"
                  className="arrow"
                />
              </h3>

              <div className="info-row">
                <span className="label">주문번호</span>
                <span className="value">#20251225-0018</span>
              </div>
              <div className="info-row">
                <span className="label">주문상태</span>
                <span className="value">
                  <span className="badge completed">픽업완료</span>
                </span>
              </div>
              <div className="info-row">
                <span className="label">결제금액</span>
                <span className="value price">₩17,500</span>
              </div>

              <div className="info-row">
                <span className="label">픽업일시</span>
                <span className="value">2025.12.25(목) 14:00</span>
              </div>
            </div>

            {/*주문자 정보*/}
            <div className="order-section">
              <h3 className="section-title">
                주문자 정보
                <img
                  src="/images/icon_arrow_b.png"
                  alt="화살표"
                  className="arrow"
                />
              </h3>

              <div className="info-row">
                <span className="label">이름</span>
                <span className="value">유저</span>
              </div>
              <div className="info-row">
                <span className="label">연락처</span>
                <span className="value">010-1234-5678</span>
              </div>

              <div className="info-row">
                <span className="label">주문일시</span>
                <span className="value">2025.12.25(목) 14:00</span>
              </div>
            </div>

            {/*주문 상품 정보*/}
            <div className="order-section">
              <h3 className="section-title">
                주문 상품
                <img
                  src="/images/icon_arrow_b.png"
                  alt="화살표"
                  className="arrow"
                />
              </h3>

              <div className="product-box">
                <div className="product-header">
                  <p className="product-name">Custom Cake</p>
                  <p className="product-price">₩50,000</p>
                </div>

                {/*옵션*/}
                <div className="product-options">
                  <span className="label">주문 옵션</span>
                  <ul>
                    <li>
                      <span>바닐라 시트 / 생크림</span>
                      <span>+₩0</span>
                    </li>
                    <li>
                      <span>딸기 x1</span>
                      <span>+₩400</span>
                    </li>
                    <li>
                      <span>블루베리 x2</span>
                      <span>+₩800</span>
                    </li>
                    <li>
                      <span>곰돌이 쿠키 x1</span>
                      <span>+₩400</span>
                    </li>
                  </ul>
                </div>

                {/*요청사항*/}
                <div className="product-memo">
                  <span className="label">요청사항</span>
                  <p>예쁘게 해주세요</p>
                </div>
              </div>
            </div>
            {/*결제정보*/}
            <div className="order-section">
              <h3 className="section-title">
                결제 정보
                <img
                  src="/images/icon_arrow_b.png"
                  alt="화살표"
                  className="arrow"
                />
              </h3>

              <div className="info-row">
                <span className="label">결제수단</span>
                <span className="value">
                  <span className="badge payment">카드</span>
                </span>
              </div>
              <div className="info-row">
                <span className="label">결제상태</span>
                <span className="value">결제완료</span>
              </div>

              <div className="info-row">
                <span className="label">결제금액</span>
                <span className="value price">₩17,500</span>
              </div>
            </div>

            {/*픽업/배송 정보*/}
            <div className="order-section">
              <h3 className="section-title">
                픽업 정보
                <img
                  src="/images/icon_arrow_b.png"
                  alt="화살표"
                  className="arrow"
                />
              </h3>

              <div className="info-row">
                <span className="label">픽업일시</span>
                <span className="value">2025-12-25 10:00</span>
              </div>
              <div className="info-row">
                <span className="label">픽업방법</span>
                <span className="value">매장 방문</span>
              </div>
            </div>
          </div>
          <Link to="/mypageOrderList" className="btn btn-gray sm">
            목록
          </Link>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default MypageOrderDetail;
