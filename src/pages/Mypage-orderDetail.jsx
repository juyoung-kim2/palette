// components
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import "./Mypage.css";
// hooks
import { useMenuToggle } from "../hooks/useMenuToggle";
import { useToggleSections } from "../hooks/useToggleSections";

// router
import { Link, useLocation, Navigate } from "react-router-dom";

function MypageOrderDetail() {
  const location = useLocation();
  const { menuOpen, openMenu, closeMenu } = useMenuToggle();
  const { openSections, toggleSection } = useToggleSections([
    "order",
    "orderer",
    "product",
    "payment",
    "pickup",
  ]);
  const { order } = location.state || {};

  if (!order) return <Navigate to="/mypage-order-list" replace />;

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
            <div
              className={`order-section ${openSections.includes("order") ? "open" : ""}`}
            >
              <h3
                className="section-title"
                role="button"
                onClick={() => toggleSection("order")}
                tabIndex={0}
                aria-expanded={openSections.includes("order")}
                aria-controls="section-order"
                onKeyDown={(e) => e.key === "Enter" && toggleSection("order")}
              >
                주문 정보
                <img src="/images/icon_arrow_b.png" alt="" className="arrow" />
              </h3>
              <div id="section-order" className="toggleContent" aria-hidden={!openSections.includes("order")}>
                <div className="info-row">
                  <span className="label">주문번호</span>
                  <span className="value">{order.id}</span>
                </div>
                <div className="info-row">
                  <span className="label">주문상태</span>
                  <span className="value">
                    <span className="badge completed">{order.status}</span>
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">결제금액</span>
                  <span className="value price">
                    ₩{order.totalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="info-row">
                  <span className="label">픽업일시</span>
                  <span className="value">
                    {order.pickupDate} {order.pickupTime}
                  </span>
                </div>
              </div>
            </div>

            {/*주문자 정보*/}
            <div
              className={`order-section ${openSections.includes("orderer") ? "open" : ""}`}
            >
              <h3
                className="section-title"
                role="button"
                onClick={() => toggleSection("orderer")}
                tabIndex={0}
                aria-expanded={openSections.includes("orderer")}
                aria-controls="section-orderer"
                onKeyDown={(e) => e.key === "Enter" && toggleSection("orderer")}
              >
                주문자 정보
                <img
                  src={"/images/icon_arrow_b.png"}
                  alt=""
                  className="arrow"
                />
              </h3>
              <div id="section-orderer" className="toggleContent" aria-hidden={!openSections.includes("orderer")}>
                <div className="info-row">
                  <span className="label">이름</span>
                  <span className="value">{order.orderer.name}</span>
                </div>
                <div className="info-row">
                  <span className="label">연락처</span>
                  <span className="value">{order.orderer.phone}</span>
                </div>
                <div className="info-row">
                  <span className="label">주문일시</span>
                  <span className="value">
                    {order.pickupDate} {order.pickupTime}
                  </span>
                </div>
              </div>
            </div>

            {/*주문 상품 정보*/}
            <div
              className={`order-section ${openSections.includes("product") ? "open" : ""}`}
            >
              <h3
                className="section-title"
                role="button"
                onClick={() => toggleSection("product")}
                tabIndex={0}
                aria-expanded={openSections.includes("product")}
                aria-controls="section-product"
                onKeyDown={(e) => e.key === "Enter" && toggleSection("product")}
              >
                주문 상품
                <img src="/images/icon_arrow_b.png" alt="" className="arrow" />
              </h3>
              <div id="section-product" className="toggleContent" aria-hidden={!openSections.includes("product")}>
                {order.items.map((item, idx) => (
                  <div className="product-box" key={idx}>
                    <img src={item.cakeImage} alt="주문케이크 이미지"></img>
                    <div className="product-header">
                      <p className="product-name">Custom Cake</p>
                      <p className="product-price">
                        ₩ {item.totalAmount.toLocaleString()}
                      </p>
                    </div>

                    {/*옵션*/}
                    <div className="product-options">
                      <span className="label">주문 옵션</span>
                      <ul>
                        <li>
                          <span>{item.sheetName}</span>
                          <span>+ ₩{item.sheetPrice?.toLocaleString()}</span>
                        </li>
                        <li>
                          <span>{item.creamName}</span>
                          <span>+ ₩{item.creamPrice?.toLocaleString()}</span>
                        </li>
                        {item.selectedDeco.map((deco, idx) => (
                          <li key={idx}>
                            <span>
                              {deco.name} x{deco.count}
                            </span>
                            <span>
                              + ₩{(deco.price * deco.count).toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/*요청사항*/}
                    <div className="product-memo">
                      <span className="label">요청사항</span>
                      <p>{order.request}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/*결제정보*/}
            <div
              className={`order-section ${openSections.includes("payment") ? "open" : ""}`}
            >
              <h3
                className="section-title"
                role="button"
                onClick={() => toggleSection("payment")}
                tabIndex={0}
                aria-expanded={openSections.includes("payment")}
                aria-controls="section-payment"
                onKeyDown={(e) => e.key === "Enter" && toggleSection("payment")}
              >
                결제 정보
                <img src="/images/icon_arrow_b.png" alt="" className="arrow" />
              </h3>
              <div id="section-payment" className="toggleContent" aria-hidden={!openSections.includes("payment")}>
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
                  <span className="value price">
                    ₩{order.totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/*픽업/배송 정보*/}
            <div
              className={`order-section ${openSections.includes("pickup") ? "open" : ""}`}
            >
              <h3
                className="section-title"
                role="button"
                onClick={() => toggleSection("pickup")}
                tabIndex={0}
                aria-expanded={openSections.includes("pickup")}
                aria-controls="section-pickup"
                onKeyDown={(e) => e.key === "Enter" && toggleSection("pickup")}
              >
                픽업 정보
                <img src="/images/icon_arrow_b.png" alt="" className="arrow" />
              </h3>
              <div id="section-pickup" className="toggleContent" aria-hidden={!openSections.includes("pickup")}>
                <div className="info-row">
                  <span className="label">픽업일시</span>
                  <span className="value">
                    {order.pickupDate} {order.pickupTime}
                  </span>
                </div>
                <div className="info-row">
                  <span className="label">픽업방법</span>
                  <span className="value">매장 방문</span>
                </div>
              </div>
            </div>
          </div>
          <Link to="/mypage-order-list" className="btn btn-gray sm">
            목록
          </Link>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default MypageOrderDetail;
