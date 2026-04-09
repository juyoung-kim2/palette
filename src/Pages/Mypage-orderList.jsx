import "../style.css";
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function MypageOrderList() {
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
          <h1>주문내역</h1>
          <div className="card-wrap">
            {/*주문 1건*/}
            <div className="order-card">
              {/*주문 헤더*/}
              <div className="order-header">
                <span className="order-date">
                  {" "}
                  2025-08-06 <span>( #20251225-0018)</span>{" "}
                </span>
                <Link to="/mypageOrderDetail" className="order-detail-link">
                  상세보기 <img src="/images/icon_arrow_r.png" alt="화살표" />
                </Link>
              </div>

              {/*상품 정보*/}
              <div className="order-product">
                <div className="product-thumb">
                  <img src="/images/detail_thumb.png" alt="상품 이미지" />
                </div>

                <div className="product-info">
                  <p className="product-name">
                    Custom Cake<span>₩50,000</span>
                  </p>
                  <p className="pickup-info">2025-12-25(목) 14:00 픽업</p>
                  <p className="product-request">예쁘게 해주세요</p>
                  <ul className="product-options">
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
              </div>

              {/*주문 상태*/}
              <div className="order-status">
                <strong className="status-text">주문상태</strong>
                <span className="badge completed">픽업완료</span>
              </div>
            </div>
          </div>

          <div className="paginate">
            <a href="#" className="first"></a>
            <a href="#" className="prev"></a>
            <ol>
              <li>
                <a href="#" className="page-num">
                  1
                </a>
              </li>
              <li>
                <a href="#" className="page-num selected">
                  2
                </a>
              </li>
              <li>
                <a href="#" className="page-num">
                  3
                </a>
              </li>
            </ol>
            <a href="#" className="next"></a>
            <a href="#" className="last"></a>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default MypageOrderList;
