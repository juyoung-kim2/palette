import "../style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import HowToOrderSection from "../components/HowToOrderSection";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../Pages/Cart";

function Order() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [optionOpen, setOptionOpen] = useState(false);

  const openOption = () => {
    setOptionOpen(true);
  };

  const closeOption = () => {
    setOptionOpen(false);
  };

  const [activeTab, setActiveTab] = useState("cakeSheet");
  const [selectedSheet, setSelectedSheet] = useState("sheet-base");
  const [selectedCream, setSelectedCream] = useState("cream-base");
  const [lettering, setLettering] = useState("");
  const [decoCounts, setDecoCounts] = useState({
    blueberry: 0,
    strawberry: 0,
    ribbonBlack: 0,
    ribbonPink: 0,
    cookie: 0,
  });
  const handleCountChange = (name, type) => {
    setDecoCounts((prev) => {
      const currentCount = prev[name];

      if (type === "plus") {
        return { ...prev, [name]: currentCount + 1 };
      } else {
        return { ...prev, [name]: Math.max(0, currentCount - 1) };
      }
    });
  };

  const optionInfo = {
    //시트
    "sheet-base": { name: "기본", price: 0 },
    "sheet-choco": { name: "초코 시트", price: 2000 },
    "sheet-red": { name: "레드벨벳 시트", price: 3000 },
    "sheet-green": { name: "녹차 시트", price: 3000 },

    //크림
    "cream-base": { name: "생크림", price: 0 },
    "cream-choco": { name: "초코 크림", price: 2000 },
    "cream-strawberry": { name: "딸기 크림", price: 3000 },
    "cream-sesame": { name: "흑임자 크림", price: 4000 },

    //데코
    blueberry: { name: "블루베리", price: 300 },
    strawberry: { name: "딸기", price: 400 },
    ribbonBlack: { name: "리본(블랙)", price: 300 },
    ribbonPink: { name: "리본(분홍)", price: 300 },
    cookie: { name: "곰돌이 쿠키", price: 500 },
  };

  // 총액 계산
  const basePrice = 50000; //케이크 기본가
  const sheetPrice = optionInfo[selectedSheet].price;
  const creamPrice = optionInfo[selectedCream].price;

  // 데코 가격 합산 (개수*단가)
  const decoPrice = Object.entries(decoCounts).reduce((acc, [id, count]) => {
    return acc + count * optionInfo[id].price;
  }, 0);

  const totalPrice = basePrice + sheetPrice + creamPrice + decoPrice;

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

  const navigate = useNavigate();
  const handleOrder = () => {
    const finalOrder = {
      id: Date.now(), // 각 주문을 구분하기 위한 고유 id
      sheetName: optionInfo[selectedSheet]?.name,
      sheetPrice: optionInfo[selectedSheet]?.price,
      creamName: optionInfo[selectedCream]?.name,
      creamPrice: optionInfo[selectedCream]?.price,
      selectedDeco: Object.entries(decoCounts)
        .filter(([id, count]) => count > 0)
        .map(([id, count]) => ({
          name: optionInfo[id]?.name,
          count: count,
          price: optionInfo[id]?.price,
        })),
      lettering: lettering,
      totalAmount: totalPrice,
    };

    //기존 창고에 있던 목록 가져오기
    const existingCart = JSON.parse(localStorage.getItem("cartData")) || [];

    //기존 목록에 새 주문 추가하기 (배열에 push)
    const updatedCart = [...existingCart, finalOrder];

    //합쳐진 전체 목록을 다시 저장
    localStorage.setItem("cartData", JSON.stringify(updatedCart));

    navigate("/cart");
    alert("장바구니에 상품을 담았습니다 :)");
  };

  //바로 구매
  const handleDirectOrder = () => {
    const currentCake = {
      id: Date.now(),
      sheetName: optionInfo[selectedSheet]?.name,
      sheetPrice: optionInfo[selectedSheet]?.price,
      creamName: optionInfo[selectedCream]?.name,
      creamPrice: optionInfo[selectedCream]?.price,
      selectedDeco: Object.entries(decoCounts)
        .filter(([id, count]) => count > 0)
        .map(([id, count]) => ({
          name: optionInfo[id]?.name,
          count: count,
          price: optionInfo[id]?.price,
        })),
      lettering: lettering,
      totalAmount: totalPrice,
    };
    navigate("/ordersheet", {
      state: {
        orders: [currentCake],
        totalPrice: totalPrice,
      },
    });
  };
  return (
    <div className="content-wrapper">
      <div id="leftBanner">
        <LeftBanner />
      </div>

      <main className="product-section detail-page-wrapper main-section">
        <Header variant="sub" openMenu={openMenu} />
        <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />

        <div className="main-image-area">
          <img src="images/detail_thnmb.png" alt="상품썸네일" />
        </div>
        <div className="product-info-section">
          <h1 className="title">Custom Cake</h1>
          <p className="price">₩{basePrice.toLocaleString()}</p>
          <p className="description">
            케이크의 모양, 색은 물론이고 당사의 핸들링 공법이 조합된 보세요.
            전달받은 이야기를 바탕으로, 오직 당신만을 위한 케이크를 정성껏
            제작합니다.
          </p>
        </div>

        <HowToOrderSection />

        <div className="fixed-bottom-bar">
          <button className="order-button btn btn-primary" onClick={openOption}>
            ORDER NOW
          </button>
        </div>

        <div className={`option-popup-layer ${optionOpen ? "active" : ""}`}>
          <div className="popup-dimmed"></div>
          <div className="popup-content scroll">
            <div className="popup-handle" onClick={closeOption}></div>

            <nav className="option-tabs">
              {["cakeSheet", "cream", "deco", "Lettering"].map((tab) => (
                <button
                  key={tab}
                  className={`tab-item ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>

            <div className="option-selection-container">
              {/* Cake Sheet 패널 */}
              <div
                className={`option-panel ${activeTab === "cakeSheet" ? "active" : ""}`}
              >
                <Swiper
                  slidesPerView={3.5}
                  loop={false}
                  speed={1500}
                  spaceBetween={10}
                >
                  <SwiperSlide>
                    <label
                      className={`option-item ${selectedSheet === "sheet-base" ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="sheetOption"
                        value="sheet-base"
                        checked={selectedSheet === "sheet-base"}
                        onChange={(e) => setSelectedSheet(e.target.value)}
                      />
                      <div className="option-image-box">
                        <img src="images/option1_1.png" />
                      </div>
                      <span className="option-name">
                        {optionInfo["sheet-base"].name}
                      </span>
                      <span className="option-price">
                        +{optionInfo["sheet-base"].price}
                      </span>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <label
                      className={`option-item ${selectedSheet === "sheet-choco" ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="sheetOption"
                        value="sheet-choco"
                        checked={selectedSheet === "sheet-choco"}
                        onChange={(e) => setSelectedSheet(e.target.value)}
                      />
                      <div className="option-image-box">
                        <img src="images/option1_2.png" />
                      </div>
                      <span className="option-name">
                        {optionInfo["sheet-choco"].name}
                      </span>
                      <span className="option-price">
                        +{optionInfo["sheet-choco"].price}
                      </span>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <label
                      className={`option-item ${selectedSheet === "sheet-red" ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="sheetOption"
                        value="sheet-red"
                        checked={selectedSheet === "sheet-red"}
                        onChange={(e) => setSelectedSheet(e.target.value)}
                      />
                      <div className="option-image-box">
                        <img src="images/option1_3.png" />
                      </div>
                      <span className="option-name">
                        {optionInfo["sheet-red"].name}
                      </span>
                      <span className="option-price">
                        +{optionInfo["sheet-red"].price}
                      </span>
                    </label>
                  </SwiperSlide>

                  <SwiperSlide>
                    {" "}
                    <label
                      className={`option-item ${selectedSheet === "sheet-green" ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="sheetOption"
                        value="sheet-green"
                        checked={selectedSheet === "sheet-green"}
                        onChange={(e) => setSelectedSheet(e.target.value)}
                      />
                      <div className="option-image-box">
                        <img src="images/option1_4.png" />
                      </div>
                      <span className="option-name">
                        {optionInfo["sheet-green"].name}
                      </span>
                      <span className="option-price">
                        +{optionInfo["sheet-green"].price}
                      </span>
                    </label>
                  </SwiperSlide>
                </Swiper>
              </div>

              {/* Cream 패널 */}
              <div
                className={`option-panel ${activeTab === "cream" ? "active" : ""}`}
              >
                <Swiper
                  slidesPerView={3.5}
                  loop={false}
                  speed={1500}
                  spaceBetween={10}
                >
                  <SwiperSlide>
                    {" "}
                    <label
                      className={`option-item ${selectedCream === "cream-base" ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="CreamOption"
                        value="cream-base"
                        checked={selectedCream === "cream-base"}
                        onChange={(e) => setSelectedCream(e.target.value)}
                      />
                      <div className="option-image-box">
                        <img src="images/option2_1.png" />
                      </div>
                      <span className="option-name">
                        {optionInfo["cream-base"].name}
                      </span>
                      <span className="option-price">
                        +{optionInfo["cream-base"].price}
                      </span>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <label
                      className={`option-item ${selectedCream === "cream-choco" ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="CreamOption"
                        value="cream-choco"
                        checked={selectedCream === "cream-choco"}
                        onChange={(e) => setSelectedCream(e.target.value)}
                      />
                      <div className="option-image-box">
                        <img src="images/option2_2.png" />
                      </div>
                      <span className="option-name">
                        {optionInfo["cream-choco"].name}
                      </span>
                      <span className="option-price">
                        +{optionInfo["cream-choco"].price}
                      </span>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <label
                      className={`option-item ${selectedCream === "cream-strawberry" ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="CreamOption"
                        value="cream-strawberry"
                        checked={selectedCream === "cream-strawberry"}
                        onChange={(e) => setSelectedCream(e.target.value)}
                      />
                      <div className="option-image-box">
                        <img src="images/option2_3.png" />
                      </div>
                      <span className="option-name">
                        {optionInfo["cream-strawberry"].name}
                      </span>
                      <span className="option-price">
                        +{optionInfo["cream-strawberry"].price}
                      </span>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <label
                      className={`option-item ${selectedCream === "cream-sesame" ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="CreamOption"
                        value="cream-sesame"
                        checked={selectedCream === "cream-sesame"}
                        onChange={(e) => setSelectedCream(e.target.value)}
                      />
                      <div className="option-image-box">
                        <img src="images/option2_4.png" />
                      </div>
                      <span className="option-name">
                        {optionInfo["cream-sesame"].name}
                      </span>
                      <span className="option-price">
                        +{optionInfo["cream-sesame"].price}
                      </span>
                    </label>
                  </SwiperSlide>
                </Swiper>
              </div>

              {/* Deco 패널 */}
              <div
                className={`option-panel ${activeTab === "deco" ? "active" : ""}`}
              >
                <Swiper
                  slidesPerView={3.5}
                  loop={false}
                  speed={1500}
                  spaceBetween={10}
                >
                  <SwiperSlide>
                    <label
                      className={`option-item ${decoCounts.blueberry > 0 ? "selected" : ""}`}
                    >
                      <input type="checkbox" name="decoOption" />
                      <div className="option-image-box">
                        <img src="images/option3_1.png" />
                      </div>
                      <span className="option-name">
                        {optionInfo["blueberry"].name}
                      </span>
                      <span className="option-price">
                        +{optionInfo["blueberry"].price}
                      </span>
                      <div className="topping-qty">
                        <button
                          className="qty-minus"
                          onClick={() =>
                            handleCountChange("blueberry", "minus")
                          }
                        >
                          -
                        </button>
                        <span className="qty-value">
                          {decoCounts.blueberry}
                        </span>
                        <button
                          className="qty-plus"
                          onClick={() => handleCountChange("blueberry", "plus")}
                        >
                          +
                        </button>
                      </div>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide>
                    <label
                      className={`option-item ${decoCounts.strawberry > 0 ? "selected" : ""}`}
                    >
                      <input type="checkbox" name="decoOption" />
                      <div className="option-image-box">
                        <img src="images/option3_2.png" />
                      </div>
                      <span className="option-name">
                        {optionInfo["strawberry"].name}
                      </span>
                      <span className="option-price">
                        +{optionInfo["strawberry"].price}
                      </span>
                      <div className="topping-qty">
                        <button
                          className="qty-minus"
                          onClick={() =>
                            handleCountChange("strawberry", "minus")
                          }
                        >
                          -
                        </button>
                        <span className="qty-value">
                          {decoCounts.strawberry}
                        </span>
                        <button
                          className="qty-plus"
                          onClick={() =>
                            handleCountChange("strawberry", "plus")
                          }
                        >
                          +
                        </button>
                      </div>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide>
                    <label
                      className={`option-item ${decoCounts.ribbonBlack > 0 ? "selected" : ""}`}
                    >
                      <input type="checkbox" name="decoOption" />
                      <div className="option-image-box">
                        <img src="images/option3_5.png" />
                      </div>
                      <span className="option-name">
                        {optionInfo["ribbonBlack"].name}
                      </span>
                      <span className="option-price">
                        +{optionInfo["ribbonBlack"].price}
                      </span>
                      <div className="topping-qty">
                        <button
                          className="qty-minus"
                          onClick={() =>
                            handleCountChange("ribbonBlack", "minus")
                          }
                        >
                          -
                        </button>
                        <span className="qty-value">
                          {decoCounts.ribbonBlack}
                        </span>
                        <button
                          className="qty-plus"
                          onClick={() =>
                            handleCountChange("ribbonBlack", "plus")
                          }
                        >
                          +
                        </button>
                      </div>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide>
                    <label
                      className={`option-item ${decoCounts.ribbonPink > 0 ? "selected" : ""}`}
                    >
                      <input type="checkbox" name="decoOption" />
                      <div className="option-image-box">
                        <img src="images/option3_4.png" />
                      </div>
                      <span className="option-name">
                        {optionInfo["ribbonPink"].name}
                      </span>
                      <span className="option-price">
                        +{optionInfo["ribbonPink"].price}
                      </span>
                      <div className="topping-qty">
                        <button
                          className="qty-minus"
                          onClick={() =>
                            handleCountChange("ribbonPink", "minus")
                          }
                        >
                          -
                        </button>
                        <span className="qty-value">
                          {decoCounts.ribbonPink}
                        </span>
                        <button
                          className="qty-plus"
                          onClick={() =>
                            handleCountChange("ribbonPink", "plus")
                          }
                        >
                          +
                        </button>
                      </div>
                    </label>
                  </SwiperSlide>
                  <SwiperSlide>
                    {" "}
                    <label
                      className={`option-item ${decoCounts.cookie > 0 ? "selected" : ""}`}
                    >
                      <input type="checkbox" name="decoOption" />
                      <div className="option-image-box">
                        <img src="images/option3_3.png" />
                      </div>
                      <span className="option-name">
                        {optionInfo["cookie"].name}
                      </span>
                      <span className="option-price" data-price="500">
                        +{optionInfo["cookie"].price}
                      </span>
                      <div className="topping-qty">
                        <button
                          className="qty-minus"
                          onClick={() => handleCountChange("cookie", "minus")}
                        >
                          -
                        </button>
                        <span className="qty-value">{decoCounts.cookie}</span>
                        <button
                          className="qty-plus"
                          onClick={() => handleCountChange("cookie", "plus")}
                        >
                          +
                        </button>
                      </div>
                    </label>
                  </SwiperSlide>
                </Swiper>
              </div>
              {/* Letter 패널 */}
              <div
                className={`option-panel letter ${activeTab === "Lettering" ? "active" : ""}`}
              >
                <p className="info">
                  레터링 문구를 입력해주세요. (최대 15자 이내)
                </p>
                <input
                  type="text"
                  id="cake-text"
                  placeholder="케이크에 적을 문구를 입력해 주세요"
                  value={lettering}
                  onChange={(e) => setLettering(e.target.value)}
                  maxLength={15}
                />
              </div>
            </div>

            <div className="selected-option-box">
              <div className="selected-group selected-base">
                <span className="name">{optionInfo[selectedSheet]?.name}</span>
                <span className="price">
                  + ₩{optionInfo[selectedSheet]?.price}
                </span>
              </div>
              <div className="selected-group selected-base">
                <span className="name">{optionInfo[selectedCream]?.name}</span>
                <span className="price">
                  + ₩{optionInfo[selectedCream]?.price}
                </span>
              </div>
              <div className="selected-toppings">
                {Object.entries(decoCounts).map(
                  ([id, count]) =>
                    //수량이 0보다 클 때만 span 태그 생성
                    count > 0 && (
                      <span key={id} className="topping-item">
                        <span className="name">
                          {optionInfo[id]?.name} x {count}
                        </span>
                        <span className="price">
                          {" "}
                          + ₩{optionInfo[id]?.price * count}
                        </span>
                      </span>
                    ),
                )}
              </div>
              <div className="selected-lettering">
                {/* lettering에 글자가 한 글자라도 있으면(&& 상황) 화면에 그려줍니다. */}
                {lettering.length > 0 && (
                  <>
                    <span className="label">레터링 </span>
                    <span className="text">"{lettering}"</span>
                  </>
                )}
              </div>
            </div>
            <div className="popup-total-price">
              <span className="total-label">TOTAL</span>
              <span className="total-amount">
                ₩{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="btn_wrap">
            <button className="order-button btn-gray btn" onClick={handleOrder}>
              ADD TO CART
            </button>
            <button
              className="order-button popup-order-button btn btn-primary"
              onClick={handleDirectOrder}
            >
              ORDER NOW
            </button>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Order;
