// components
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import "./Order.css";
// hooks
import { useMenuToggle } from "../hooks/useMenuToggle";
import { useToggleSections } from "../hooks/useToggleSections";

// router
import { useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

function OrderComplete() {
  const { menuOpen, openMenu, closeMenu } = useMenuToggle();
  const { openSections, toggleSection } = useToggleSections([
    "pickup",
    "request",
    "payInfo",
  ]);
  const location = useLocation();
  const { id, orderer, items, totalPrice, pickupDate, pickupTime, request } =
    location.state || {};

  if (!orderer) return <Navigate to="/" replace />;

  useEffect(() => {
    if (!orderer) return;
    try {
      //기존 장바구니 내역 가저오기
      const existingCart = JSON.parse(localStorage.getItem("cartData")) || [];
      //구매 완료한 상품 id
      const orderId = (items ?? []).map((item) => item.id);
      const deleteId = existingCart.filter(
        (cart) => !orderId.includes(cart.id),
      );
      //삭제한 목록 카트에 다시 저장
      localStorage.setItem("cartData", JSON.stringify(deleteId));
      window.dispatchEvent(new Event("cartUpdate"));
    } catch (e) {
      console.error("장바구니 갱신 실패:", e);
    }

    try {
      const orderData = {
        id,
        orderer,
        items,
        totalPrice,
        pickupDate,
        pickupTime,
        request,
        status: "주문완료",
      };

      //기존 주문 내역에 있던 목록 가져오기
      const existingOrder =
        JSON.parse(localStorage.getItem("orderHistory")) || [];

      //기존 목록에 새 주문 추가하기 (배열에 push)
      const updatedHistory = [...existingOrder, orderData];

      //합쳐진 전체 목록을 다시 저장
      localStorage.setItem("orderHistory", JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("주문 내역 저장 실패:", e);
      alert(
        "저장 공간이 부족해 주문 내역이 기록되지 않았어요.\n마이페이지에서 이전 주문내역을 정리한 후 다시 확인해주세요.",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="content-wrapper">
        <div id="leftBanner">
          <LeftBanner />
        </div>

        <main className="orderresult-section main-section">
          <Header variant="sub" openMenu={openMenu} />
          <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />
          <section className="orderresult-container">
            {/* 주문완료 상단 */}
            <div className="result-top">
              <div className="result-text">
                <img src="/images/order_result_icon.png" alt="" />
                <h1 className="result-title">
                  <span>주문이 완료되었어요!</span>
                </h1>
              </div>
              <div className="result-info">
                <ul>
                  <li>
                    <span className="info-title">주문번호</span>
                    <span className="info-data">{id}</span>
                  </li>
                  <li>
                    <span className="info-title">수령인</span>
                    <span className="info-data">{orderer?.name}</span>
                  </li>
                  <li>
                    <span className="info-title">연락처</span>
                    <span className="info-data">{orderer?.phone}</span>
                  </li>
                  <li>
                    <span className="info-title">결제금액</span>
                    <span className="info-data">
                      ₩{totalPrice?.toLocaleString()}
                    </span>
                  </li>
                  <li>
                    <span className="info-title">픽업 예정일시</span>
                    <span className="info-data">
                      {pickupDate} / {pickupTime}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            {/* 결제정보 */}
            <div
              className={`payInfo-section ${openSections.includes("payInfo") ? "open" : ""}`}
            >
              <div
                className="toggleTitle"
                role="button"
                tabIndex={0}
                aria-expanded={openSections.includes("payInfo")}
                aria-controls="section-payInfo"
                onClick={() => toggleSection("payInfo")}
                onKeyDown={(e) => e.key === "Enter" && toggleSection("payInfo")}
              >
                <h2>결제정보</h2>
                <img src="/images/icon_arrow_b.png" alt="" aria-hidden="true" />
              </div>
              <div
                id="section-payInfo"
                className="toggleContent"
                aria-hidden={!openSections.includes("payInfo")}
              >
                <div className="box_container">
                  {items &&
                    items.map((item, index) => (
                      <ul key={index} className="option_list">
                        {/* 1. 상품 기본 정보 */}
                        <li className="prd_info">
                          <p className="prd_name">Custom Cake</p>
                          <p className="prd_price">
                            ₩{item.totalAmount.toLocaleString()}
                          </p>
                        </li>
                        <li>
                          <span>{item.sheetName}</span>
                          <span>+ ₩{item.sheetPrice?.toLocaleString()}</span>
                        </li>
                        <li>
                          <span>{item.creamName}</span>
                          <span>+ ₩{item.creamPrice?.toLocaleString()}</span>
                        </li>
                        {item.selectedDeco.map((deco, index) => (
                          <li key={index}>
                            <span>
                              {deco.name} x{deco.count}
                            </span>
                            <span>
                              + ₩{(deco.price * deco.count).toLocaleString()}
                            </span>{" "}
                            {/* 가격 정보가 있다면 계산 */}
                          </li>
                        ))}{" "}
                        <li>
                          <span>레터링 문구</span>
                          <span>{item.lettering}</span>
                        </li>
                      </ul>
                    ))}
                </div>
                <div className="total_price">
                  <p className="total">TOTAL</p>
                  <p>₩{totalPrice?.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* 픽업안내 */}
            <div
              className={`pickup-section ${openSections.includes("pickup") ? "open" : ""}`}
            >
              <div
                className="toggleTitle"
                role="button"
                tabIndex={0}
                aria-expanded={openSections.includes("pickup")}
                aria-controls="section-pickup"
                onClick={() => toggleSection("pickup")}
                onKeyDown={(e) => e.key === "Enter" && toggleSection("pickup")}
              >
                <h2>픽업 안내</h2>
                <img src="/images/icon_arrow_b.png" alt="" aria-hidden="true" />
              </div>
              <div
                id="section-pickup"
                className="toggleContent"
                aria-hidden={!openSections.includes("pickup")}
              >
                <p>Palete Studio 1층</p>
                <div className="text-btn">
                  <a
                    href="https://map.naver.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="지도 보기 (새 창에서 열림)"
                  >
                    지도 보기
                    <img
                      src="/images/icon_arrow_r_c.png"
                      alt=""
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* 요청사항 */}
            <div
              className={`request-section ${openSections.includes("request") ? "open" : ""}`}
            >
              <div
                className="toggleTitle"
                role="button"
                tabIndex={0}
                aria-expanded={openSections.includes("request")}
                aria-controls="section-request"
                onClick={() => toggleSection("request")}
                onKeyDown={(e) => e.key === "Enter" && toggleSection("request")}
              >
                <h2>요청사항</h2>
                <img src="/images/icon_arrow_b.png" alt="" aria-hidden="true" />
              </div>
              <div
                id="section-request"
                className="toggleContent"
                aria-hidden={!openSections.includes("request")}
              >
                {request && request.trim() !== "" ? (
                  <p>{request}</p>
                ) : (
                  <p className="empty">요청사항이 없습니다.</p>
                )}
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
}

export default OrderComplete;
