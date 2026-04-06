import "../style.css";
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function OrderSheet() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = (e) => {
    e.preventDefault();
    setMenuOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

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

  const location = useLocation();
  const { orders, totalPrice } = location.state || {
    orders: [],
    totalPrice: 0,
  };

  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneFirst, setUserPhoneFirst] = useState("");
  const [userPhoneMid, setUserPhoneMid] = useState("");
  const [userPhoneLast, setUserPhoneLast] = useState("");
  const [userRequest, setUserRequest] = useState("");
  const navigate = useNavigate();
  const handlePayment = () => {
    if (!userName || !userPhoneMid || !userPhoneLast || !selectedTime) {
      alert("픽업 시간과 주문자 정보를 모두 입력해주세요!");
      return;
    }

    const fullPhone = `${userPhoneFirst}-${userPhoneMid}-${userPhoneLast}`;
    const orderData = {
      orderer: {
        name: userName,
        phone: fullPhone,
      },
      items: orders,
      totalPrice: totalPrice,
      pickupDate: selectedDate,
      pickupTime: selectedTime,
      request: userRequest,
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
                  <img src="images/detail_thumb.png" alt="" />
                </div>

                {/*주문상품*/}
                <div className="product-section">
                  <div className="toggleTitle">
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
                <div className="pickup-section">
                  <div className="toggleTitle">
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
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        >
                          <option value="2025-12-05">2025 - 12 - 23</option>
                          <option value="2025-12-06">2025 - 12 - 24</option>
                          <option value="2025-12-07">2025 - 12 - 25</option>
                          <option value="2025-12-07">2025 - 12 - 26</option>
                        </select>
                      </div>
                    </div>

                    {/*픽업시간*/}
                    <div className="pickup-field">
                      <label className="pickup-label">픽업 시간</label>
                      <div className="pickup-time-list">
                        {[
                          "10:00",
                          "11:00",
                          "12:00",
                          "13:00",
                          "14:00",
                          "15:00",
                        ].map((time) => (
                          <button
                            key={time}
                            type="button"
                            className={`pickup-time-btn ${selectedTime === time ? "is-active" : ""}`}
                            onClick={() => setSelectedTime(time)}
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
                <div className="orderer-section">
                  <div className="toggleTitle">
                    <h3>주문자 정보</h3>
                    <img src="images/icon_arrow_b.png" alt="" />
                  </div>
                  <div className="toggleContent">
                    <div className="orderer-field">
                      <label className="orderer-label">수령인</label>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <div className="orderer-field">
                      <label className="orderer-label">연락처</label>
                      <div className="contact-input-wrapper">
                        {/*앞자리*/}
                        <select
                          className="contact-select"
                          value={userPhoneFirst}
                          onChange={(e) => setUserPhoneFirst(e.target.value)}
                        >
                          <option value="010">010</option>
                          <option value="011">011</option>
                          <option value="016">016</option>
                          <option value="017">017</option>
                          <option value="018">018</option>
                          <option value="019">019</option>
                        </select>

                        <span className="dash">-</span>

                        {/*중간번호*/}
                        <input
                          type="text"
                          className="contact-input"
                          maxlength="4"
                          placeholder="1234"
                          value={userPhoneMid}
                          onChange={(e) =>
                            setUserPhoneMid(
                              e.target.value.replace(/[^0-9]/g, ""),
                            )
                          }
                        />

                        <span className="dash">-</span>

                        {/*끝번호*/}
                        <input
                          type="text"
                          className="contact-input"
                          maxlength="4"
                          placeholder="5678"
                          value={userPhoneLast}
                          onChange={(e) =>
                            setUserPhoneLast(
                              e.target.value.replace(/[^0-9]/g, ""),
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/*요청사항*/}
                <div className="request-section">
                  <div className="toggleTitle">
                    <h3>요청사항</h3>
                    <img src="images/icon_arrow_b.png" alt="" />
                  </div>
                  <div className="toggleContent">
                    <label className="input-label">요청사항</label>
                    <textarea
                      className="textarea"
                      placeholder="원하시는 디자인·색감·레터링 느낌이 있다면 적어주세요 :)"
                      value={userRequest}
                      onChange={(e) => setUserRequest(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                {/*결제수단*/}
                <div className="payment-section">
                  <div className="toggleTitle">
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
                <div className="payInfo-section">
                  <div className="toggleTitle">
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
