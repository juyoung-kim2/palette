import "../style.css";
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function OrderComplete() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);

  const openOption = () => {
    setOptionOpen(true);
  };

  const closeOption = () => {
    setOptionOpen(false);
  };

  useEffect(() => {
    if (menuOpen || optionOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, optionOpen]);

  const openMenu = (e) => {
    e.preventDefault();
    setMenuOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { orderer, items, totalPrice, pickupDate, pickupTime, request } =
    location.state || {};
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
                <img src="images/order_result_icon.png" alt="" />
                <h1 className="result-title">
                  <span>주문이 완료되었어요!</span>
                </h1>
              </div>
              <div className="result-info">
                <ul>
                  <li>
                    <span className="info-title">주문번호</span>
                    <span className="info-data">20251209-0000001</span>
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
                      ₩{totalPrice.toLocaleString()}
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
            <div className="payInfo-section">
              <div className="toggleTitle">
                <h3>결제정보</h3>
                <img src="images/icon_arrow_b.png" alt="" />
              </div>
              <div className="toggleContent">
                <div className="box_container">
                  {items &&
                    items.map((item, index) => (
                      <ul key={index} className="option_list">
                        {/* 1. 상품 기본 정보 */}
                        <div className="prd_info">
                          <p className="prd_name">Custom Cake</p>
                          <p className="prd_price">
                            ₩{item.totalAmount.toLocaleString()}
                          </p>
                        </div>
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
                  <p>₩{totalPrice.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* 픽업안내 */}
            <div className="pickup-section">
              <div className="toggleTitle">
                <h3>픽업 안내</h3>
                <img src="images/icon_arrow_b.png" alt="" />
              </div>
              <div className="toggleContent">
                <p>Palete Studio 서울 강남구 논현로 123</p>
                <div className="text-btn">
                  <a href="#">
                    지도 보기 <img src="images/icon_arrow_r_c.png" alt="" />
                  </a>
                </div>
              </div>
            </div>

            {/* 요청사항 */}
            <div className="request-section">
              <div className="toggleTitle">
                <h3>요청사항</h3>
                <img src="images/icon_arrow_b.png" alt="" />
              </div>
              <div className="toggleContent">
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
