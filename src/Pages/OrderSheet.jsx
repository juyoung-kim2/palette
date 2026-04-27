import "../style.css";
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import React, { useState } from "react";
import { data, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const pickup_dates = [
  "2025-12-23",
  "2025-12-24",
  "2025-12-25",
  "2025-12-26",
  "2025-12-27",
];
const pickup_times = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
const phone_first = ["010", "011", "016", "017", "018", "019"];

function OrderSheet() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders, totalPrice } = location.state || {
    orders: [],
    totalPrice: 0,
  };

  // 메뉴 및 섹션 토글 상태
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = (e) => {
    e.preventDefault();
    setMenuOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // 메뉴 오픈 시 스크롤 제어
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

  // 토글
  const [openSections, setOpenSections] = useState([
    "product",
    "pickup",
    "orderer",
    "request",
    "payment",
    "payInfo",
  ]);

  const toggleSection = (section) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((item) => item !== section)
        : [...prev, section],
    );
  };

  const [formData, setFormData] = useState({
    date: pickup_dates[0],
    time: "",
    name: "",
    phoneFirst: "010",
    phoneMid: "",
    phoneLast: "",
    request: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const cleanValue =
      name === "phoneMid" || name === "phoneLast"
        ? value.replace(/[^0-9]/g, "")
        : value;
    setFormData((prev) => ({ ...prev, [name]: cleanValue }));
  };

  const handlePayment = () => {
    const { name, phoneMid, phoneLast, time, date, request } = formData;
    if (!name || !phoneMid || !phoneLast || !time) {
      alert("픽업 시간과 주문자 정보를 모두 입력해주세요!");
      return;
    }

    const orderData = {
      orderer: {
        name,
        phone: `${formData.phoneFirst}-${phoneMid}-${phoneLast}`,
      },
      items: orders,
      totalPrice,
      pickupDate: date,
      pickupTime: time,
      request: request,
    };
    navigate("/order-complete", {
      state: orderData,
    });
  };

  return (
    <>
      <div className="content-wrapper">
        <div id="leftBanner">
          <LeftBanner />
        </div>

        <main className="orderform-section main-section">
          <Header variant="sub" openMenu={openMenu} />
          <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />
          <section className="orderform-container">
            {orders.length > 0 ? (
              <>
                <div className="prevImg">
                  <img
                    style={{ width: "100%" }}
                    src="/images/detail_thnmb.png"
                    alt=""
                  />
                </div>

                {/*주문상품*/}
                <div
                  className={`product-section ${openSections.includes("product") ? "open" : ""}`}
                >
                  <div
                    className="toggleTitle"
                    onClick={() => toggleSection("product")}
                  >
                    <h3>주문상품</h3>
                    <img src="images/icon_arrow_b.png" alt="" />
                  </div>
                  {orders.map((item) => (
                    <div className="toggleContent">
                      <div className="prd_info">
                        <p className="prd_name">Custom Cake</p>
                        <p className="prd_price">
                          ₩{item.totalAmount.toLocaleString()}
                        </p>
                      </div>
                      <div className="option_box">
                        <span>주문 옵션</span>
                        <div className="box_container">
                          <ul className="option_list">
                            <li>
                              <span className="option_name">
                                {item.sheetName}
                              </span>
                              <span className="option_price">
                                + ₩{item.sheetPrice}
                              </span>
                            </li>
                            <li>
                              <span className="option_name">
                                {item.creamName}
                              </span>
                              <span className="option_price">
                                + ₩{item.creamPrice}
                              </span>
                            </li>
                            {item.selectedDeco.map((deco, index) => (
                              <li key={index}>
                                <span>
                                  {deco.name} x{deco.count}
                                </span>
                                <span>
                                  + ₩
                                  {(deco.price * deco.count).toLocaleString()}
                                </span>{" "}
                                {/* 가격 정보가 있다면 계산 */}
                              </li>
                            ))}{" "}
                            <li>
                              <span className="option_name">레터링 문구</span>
                              <span className="option_price">
                                {item.lettering}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/*픽업정보*/}
                <div
                  className={`pickup-section ${openSections.includes("pickup") ? "open" : ""}`}
                >
                  <div
                    className="toggleTitle"
                    onClick={() => toggleSection("pickup")}
                  >
                    <h3>픽업 정보</h3>
                    <img src="images/icon_arrow_b.png" alt="" />
                  </div>
                  <div className="toggleContent">
                    {/*픽업날짜*/}
                    <div className="pickup-field">
                      <label for="pickup-date" className="pickup-label">
                        픽업 날짜
                      </label>
                      <div className="pickup-date-wrapper">
                        <select
                          className="pickup-select"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                        >
                          {pickup_dates.map((date) => (
                            <option key={date} value={date}>
                              {date}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/*픽업시간*/}
                    <div className="pickup-field">
                      <label className="pickup-label">픽업 시간</label>
                      <div className="pickup-time-list">
                        {pickup_times.map((time) => (
                          <button
                            key={time}
                            type="button"
                            className={`pickup-time-btn ${formData.time === time ? "is-active" : ""}`}
                            onClick={() =>
                              setFormData((prev) => ({ ...prev, time }))
                            }
                          >
                            {time}
                          </button>
                        ))}
                        <button
                          type="button"
                          className="pickup-time-btn is-disabled"
                          disabled
                        >
                          16:00
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/*주문자 정보*/}
                <div
                  className={`orderer-section ${openSections.includes("orderer") ? "open" : ""}`}
                >
                  <div
                    className="toggleTitle"
                    onClick={() => toggleSection("orderer")}
                  >
                    <h3>주문자 정보</h3>
                    <img src="images/icon_arrow_b.png" alt="" />
                  </div>
                  <div className="toggleContent">
                    <div className="orderer-field">
                      <label className="orderer-label">수령인</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="orderer-field">
                      <label className="orderer-label">연락처</label>
                      <div className="contact-input-wrapper">
                        {/*앞자리*/}
                        <select
                          className="contact-select"
                          name="phoneFirst"
                          value={formData.phoneFirst}
                          onChange={handleInputChange}
                        >
                          {phone_first.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>

                        <span className="dash">-</span>

                        {/*중간번호*/}
                        <input
                          type="text"
                          className="contact-input"
                          maxlength="4"
                          name="phoneMid"
                          placeholder="1234"
                          value={formData.phoneMid}
                          onChange={handleInputChange}
                        />

                        <span className="dash">-</span>

                        {/*끝번호*/}
                        <input
                          type="text"
                          className="contact-input"
                          maxlength="4"
                          name="phoneLast"
                          placeholder="5678"
                          value={formData.phoneLast}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/*요청사항*/}
                <div
                  className={`request-section ${openSections.includes("request") ? "open" : ""}`}
                >
                  <div
                    className="toggleTitle"
                    onClick={() => toggleSection("request")}
                  >
                    <h3>요청사항</h3>
                    <img src="images/icon_arrow_b.png" alt="" />
                  </div>
                  <div className="toggleContent">
                    <label className="input-label">요청사항</label>
                    <textarea
                      className="textarea"
                      name="request"
                      placeholder="원하시는 디자인·색감·레터링 느낌이 있다면 적어주세요 :)"
                      value={formData.request}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                {/*결제수단*/}
                <div
                  className={`payment-section ${openSections.includes("payment") ? "open" : ""}`}
                >
                  <div
                    className="toggleTitle"
                    onClick={() => toggleSection("payment")}
                  >
                    <h3>결제수단</h3>
                    <img src="images/icon_arrow_b.png" alt="" />
                  </div>
                  <div className="toggleContent">
                    <label className="radio-row">
                      <input type="radio" name="payment" value="card" checked />
                      카드 결제
                    </label>
                    {/*                     <label className="radio-row">
                      <input type="radio" name="payment" value="bank" />
                      <span>무통장 입금</span>
                    </label>*/}
                  </div>
                </div>

                {/*결제정보*/}
                <div
                  className={`payInfo-section ${openSections.includes("payInfo") ? "open" : ""}`}
                >
                  <div
                    className="toggleTitle"
                    onClick={() => toggleSection("payInfo")}
                  >
                    <h3>결제정보</h3>
                    <img src="images/icon_arrow_b.png" alt="" />
                  </div>
                  <div className="toggleContent">
                    <div className="box_container">
                      <ul className="option_list">
                        <li>
                          <span className="option_name">상품 금액</span>
                          <span className="option_price">
                            ₩{totalPrice.toLocaleString()}
                          </span>
                        </li>
                        <li>
                          <span className="option_name">할인 금액</span>
                          <span className="option_price">- ₩0</span>
                        </li>
                      </ul>
                    </div>
                    <div className="total_price">
                      <p>TOTAL</p>
                      <p>₩{totalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/*유의사항*/}
                <div className="notice_box">
                  <div className="notice_container">
                    <p className="notice_title">
                      <img
                        src="images/icon_info.png"
                        alt=""
                        className="notice_icon"
                      />
                      유의사항
                    </p>
                    <ul>
                      <li>픽업은 주문일로부터최소 2일 이후부터 가능합니다.</li>
                      <li>당일 섭취를 권장드리며, 반드시 냉장 보관해주세요.</li>
                      <li>알러지가 있는 경우 요청사항에 미리 적어주세요.</li>
                      <li>제작이 시작된 이후에는 환불 및 변경이 어렵습니다.</li>
                      <li>픽업 시간 변경은 반드시 유선 문의 부탁드립니다.</li>
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <div className="error" style={{ textAlign: "center" }}>
                주문할 상품이 없습니다.
              </div>
            )}
          </section>
          {orders.length > 0 && (
            <div className="fixed-bottom-bar">
              <button
                className="order-button btn orderform-btn btn-primary"
                onClick={handlePayment}
              >
                <span>₩{totalPrice.toLocaleString()}</span>결제하기
              </button>
            </div>
          )}

          <Footer />
        </main>
      </div>
    </>
  );
}

export default OrderSheet;
