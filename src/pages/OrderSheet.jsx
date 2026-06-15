// components
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import "./Order.css";
// hooks
import { useState, useEffect } from "react";
import { useMenuToggle } from "../hooks/useMenuToggle";
import { useToggleSections } from "../hooks/useToggleSections";

// router
import { useLocation, useNavigate } from "react-router-dom";

function OrderSheet() {
  const { menuOpen, openMenu, closeMenu } = useMenuToggle();
  const { openSections, toggleSection } = useToggleSections([
    "product",
    "pickup",
    "orderer",
    "request",
    "payment",
    "payInfo",
  ]);
  const location = useLocation();
  const navigate = useNavigate();
  const { orders, totalPrice } = location.state || {
    orders: [],
    totalPrice: 0,
  };

  const [pickupDates, setPickupDates] = useState([]);
  const [pickupTimes, setPickupTimes] = useState([]);
  const [phoneFirst, setPhoneFirst] = useState([]);

  useEffect(() => {
    fetch("/data/pickupData.json")
      .then((result) => result.json())
      .then((data) => {
        setPickupDates(data.pickup_dates);
        setPickupTimes(data.pickup_times);
        setPhoneFirst(data.phone_first);
        setFormData((prev) => ({ ...prev, date: data.pickup_dates[0] }));
      })
      .catch((error) => {
        console.error("데이터를 불러오는데 실패했습니다", error);
        alert("서버 연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요.");
      });
  }, []);

  const [formData, setFormData] = useState({
    date: pickupDates[0],
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
      id: Date.now(),
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
          <h1 className="blind">주문서 페이지</h1>
          <Header variant="sub" openMenu={openMenu} />
          <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />
          <section className="orderform-container">
            {orders?.length > 0 ? (
              <>
                {/*주문상품*/}
                <div
                  className={`product-section ${openSections.includes("product") ? "open" : ""}`}
                >
                  <div
                    className="toggleTitle"
                    onClick={() => toggleSection("product")}
                  >
                    <h2>주문상품 ({orders?.length}개)</h2>
                    <img src="images/icon_arrow_b.png" alt="" />
                  </div>
                  {orders.map((item, index) => (
                    <div key={item.id || index} className="toggleContent">
                      <div className="prevImg">
                        <img
                          style={{ width: "100%" }}
                          src={item.cakeImage}
                          alt=""
                        />
                      </div>
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
                                </span>
                              </li>
                            ))}
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
                    <h2>픽업 정보</h2>
                    <img src="images/icon_arrow_b.png" alt="" />
                  </div>
                  <div className="toggleContent">
                    {/*픽업날짜*/}
                    <div className="pickup-field">
                      <label
                        htmlFor="pickup-date"
                        className="pickup-label"
                        aria-label="픽업 날짜 선택"
                      >
                        픽업 날짜
                      </label>
                      <div className="pickup-date-wrapper">
                        <select
                          className="pickup-select"
                          name="date"
                          id="pickup-date"
                          aria-label="픽업 날짜 조건 선택"
                          value={formData.date}
                          onChange={handleInputChange}
                        >
                          {pickupDates.map((date) => (
                            <option key={date} value={date}>
                              {date}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/*픽업시간*/}
                    <div className="pickup-field">
                      <label
                        className="pickup-label"
                        aria-label="팍업시간 선택"
                      >
                        픽업 시간
                      </label>
                      <div className="pickup-time-list">
                        {pickupTimes.map((time) => (
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
                    <h2>주문자 정보</h2>
                    <img src="images/icon_arrow_b.png" alt="" />
                  </div>
                  <div className="toggleContent">
                    <div className="orderer-field">
                      <label
                        className="orderer-label"
                        htmlFor="orderer-name"
                        aria-label="수령인 입력"
                      >
                        수령인
                      </label>
                      <input
                        id="orderer-name"
                        type="text"
                        name="name"
                        autoComplete="name"
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
                          aria-label="연락처 앞자리"
                          value={formData.phoneFirst}
                          onChange={handleInputChange}
                        >
                          {phoneFirst.map((p) => (
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
                          maxLength="4"
                          name="phoneMid"
                          placeholder="1234"
                          aria-label="연락처 중간번호"
                          value={formData.phoneMid}
                          onChange={handleInputChange}
                        />

                        <span className="dash">-</span>

                        {/*끝번호*/}
                        <input
                          type="text"
                          className="contact-input"
                          maxLength="4"
                          name="phoneLast"
                          placeholder="5678"
                          aria-label="연락처 끝번호"
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
                    <h2>요청사항</h2>
                    <img src="images/icon_arrow_b.png" alt="" />
                  </div>
                  <div className="toggleContent">
                    <label
                      className="input-label"
                      aria-label="요청사항 입력"
                      htmlFor="request-text"
                    >
                      요청사항
                    </label>
                    <textarea
                      className="textarea"
                      id="request-text"
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
                    <h2>결제수단</h2>
                    <img src="images/icon_arrow_b.png" alt="" />
                  </div>
                  <div className="toggleContent">
                    <label className="radio-row">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        aria-label="결제수단 선택"
                        checked
                      />
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
                    <h2>결제정보</h2>
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
          {orders?.length > 0 && (
            <div className="fixed-bottom-bar">
              <button
                type="button"
                className="order-button btn orderform-btn btn-primary"
                onClick={handlePayment}
              >
                <span>₩{totalPrice.toLocaleString()}</span>결제하기 (
                {orders?.length}개)
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
