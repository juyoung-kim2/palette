import "../style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import HowToOrderSection from "../components/HowToOrderSection";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cart from "../Pages/Cart";

const CAKE_OPTIONS = {
  cakeSheet: [
    { id: "sheet-base", name: "기본", price: 0, img: "option1_1.png" },
    { id: "sheet-choco", name: "초코 시트", price: 2000, img: "option1_2.png" },
    {
      id: "sheet-red",
      name: "레드벨벳 시트",
      price: 3000,
      img: "option1_3.png",
    },
    { id: "sheet-green", name: "녹차 시트", price: 3000, img: "option1_4.png" },
  ],
  cream: [
    { id: "cream-base", name: "생크림", price: 0, img: "option2_1.png" },
    { id: "cream-choco", name: "초코 크림", price: 2000, img: "option2_2.png" },
    {
      id: "cream-strawberry",
      name: "딸기 크림",
      price: 3000,
      img: "option2_3.png",
    },
    {
      id: "cream-sesame",
      name: "흑임자 크림",
      price: 4000,
      img: "option2_4.png",
    },
  ],
  deco: [
    { id: "blueberry", name: "블루베리", price: 300, img: "option3_1.png" },
    { id: "strawberry", name: "딸기", price: 400, img: "option3_2.png" },
    { id: "ribbonBlack", name: "리본(블랙)", price: 300, img: "option3_5.png" },
    { id: "ribbonPink", name: "리본(분홍)", price: 300, img: "option3_4.png" },
    { id: "cookie", name: "곰돌이 쿠키", price: 500, img: "option3_3.png" },
  ],
};

function Order() {
  const navigate = useNavigate();
  const location = useLocation();

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
  const handleDecoCount = (id, delta) => {
    setDecoCounts((prev) => ({ ...prev, [id]: Math.max(0, prev[id] + delta) }));
  };

  const allOptions = useMemo(
    () => ({
      ...Object.fromEntries(CAKE_OPTIONS.cakeSheet.map((i) => [i.id, i])),
      ...Object.fromEntries(CAKE_OPTIONS.cream.map((i) => [i.id, i])),
      ...Object.fromEntries(CAKE_OPTIONS.deco.map((i) => [i.id, i])),
    }),
    [],
  );

  // 총액 계산
  const basePrice = 50000;
  const totalPrice = useMemo(() => {
    const sPrice = allOptions[selectedSheet]?.price || 0;
    const cPrice = allOptions[selectedCream]?.price || 0;
    const dPrice = Object.entries(decoCounts).reduce((acc, [id, count]) => {
      return acc + (allOptions[id]?.price || 0) * count;
    }, 0);
    return basePrice + sPrice + cPrice + dPrice;
  }, [selectedSheet, selectedCream, decoCounts, allOptions]);

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

  const renderOptionItem = (item, type) => {
    const isSelected =
      type === "deco"
        ? decoCounts[item.id] > 0
        : type === "sheet"
          ? selectedSheet === item.id
          : selectedCream === item.id;

    return (
      <SwiperSlide key={item.id}>
        <label className={`option-item ${isSelected ? "selected" : ""}`}>
          <input
            type={type === "deco" ? "checkbox" : "radio"}
            name={`${type}Option`}
            checked={isSelected}
            onChange={() =>
              type === "sheet"
                ? setSelectedSheet(item.id)
                : type === "cream"
                  ? setSelectedCream(item.id)
                  : null
            }
          />
          <div className="option-image-box">
            <img src={`images/${item.img}`} alt={item.name} />
          </div>
          <span className="option-name">{item.name}</span>
          <span className="option-price">+{item.price}</span>

          {type === "deco" && (
            <div className="topping-qty">
              <button
                onClick={() => handleDecoCount(item.id, -1)}
                className="qty-minus"
              >
                -
              </button>
              <span className="qty-value">{decoCounts[item.id]}</span>
              <button
                onClick={() => handleDecoCount(item.id, 1)}
                className="qty-plus"
              >
                +
              </button>
            </div>
          )}
        </label>
      </SwiperSlide>
    );
  };

  const handleOrder = () => {
    const finalOrder = {
      id: Date.now(), // 각 주문을 구분하기 위한 고유 id
      sheetId: selectedSheet,
      creamId: selectedCream,
      sheetName: allOptions[selectedSheet]?.name,
      sheetPrice: allOptions[selectedSheet]?.price,
      creamName: allOptions[selectedCream]?.name,
      creamPrice: allOptions[selectedCream]?.price,
      selectedDeco: Object.entries(decoCounts)
        .filter(([id, count]) => count > 0)
        .map(([id, count]) => ({
          id: id,
          name: allOptions[id]?.name,
          count: count,
          price: allOptions[id]?.price,
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
      sheetName: allOptions[selectedSheet]?.name,
      sheetPrice: allOptions[selectedSheet]?.price,
      creamName: allOptions[selectedCream]?.name,
      creamPrice: allOptions[selectedCream]?.price,
      selectedDeco: Object.entries(decoCounts)
        .filter(([id, count]) => count > 0)
        .map(([id, count]) => ({
          name: allOptions[id]?.name,
          count: count,
          price: allOptions[id]?.price,
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

  const { editItem, editIndex } = location.state || {};

  //수정하기
  useEffect(() => {
    if (editItem) {
      const { editItem } = location.state;
      //사용자가 골랐던 값으로 세팅
      setSelectedSheet(editItem.sheetId);
      setSelectedCream(editItem.creamId);
      setLettering(editItem.lettering || "");

      if (editItem.selectedDeco) {
        const initialDecos = {};

        Object.keys(allOptions).forEach((key) => {
          if (key.startsWith("sheet") || key.startsWith("cream")) return;
          initialDecos[key] = 0;
        });
        editItem.selectedDeco.forEach((item) => {
          initialDecos[item.id] = item.count;
        });
        setDecoCounts(initialDecos);
      }
    }
  }, [editItem]);

  //수정완료
  const handleUpdateCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cartData")) || [];
    const updatedOrder = {
      id: editItem.id,
      sheetId: selectedSheet,
      creamId: selectedCream,
      sheetName: allOptions[selectedSheet]?.name,
      sheetPrice: allOptions[selectedSheet]?.price,
      creamName: allOptions[selectedCream]?.name,
      creamPrice: allOptions[selectedCream]?.price,
      selectedDeco: Object.entries(decoCounts)
        .filter(([id, count]) => count > 0)
        .map(([id, count]) => ({
          id: id,
          name: allOptions[id]?.name,
          count: count,
          price: allOptions[id]?.price,
        })),
      lettering: lettering,
      totalAmount: totalPrice,
    };

    //장바구니 배열에서 해당 인덱스만 교체하기
    const newCartList = [...currentCart];
    newCartList[editIndex] = updatedOrder;
    localStorage.setItem("cartData", JSON.stringify(newCartList));
    navigate("/cart");
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
          <img src="/images/detail_thnmb.png" alt="상품썸네일" />
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
          <div className="popup-content scroll">
            <div className="popup-handle" onClick={closeOption}></div>

            <nav className="option-tabs">
              {Object.keys(CAKE_OPTIONS)
                .concat("Lettering")
                .map((tab) => (
                  <button
                    key={tab}
                    className={`tab-item ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
                  </button>
                ))}
            </nav>

            <div className="option-selection-container">
              {/* 시트/크림/데코 패널을 하나의 로직으로 처리 */}
              {["cakeSheet", "cream", "deco"].map((type) => (
                <div
                  key={type}
                  className={`option-panel ${activeTab === type ? "active" : ""}`}
                >
                  <Swiper slidesPerView={3.5} spaceBetween={10}>
                    {CAKE_OPTIONS[type]?.map((item) =>
                      renderOptionItem(
                        item,
                        type.replace("cakeSheet", "sheet"),
                      ),
                    )}
                  </Swiper>
                </div>
              ))}

              {/* 레터링 패널만 따로 유지 */}
              <div
                className={`option-panel letter ${activeTab === "Lettering" ? "active" : ""}`}
              >
                <input
                  type="text"
                  value={lettering}
                  onChange={(e) => setLettering(e.target.value)}
                  maxLength={15}
                />
              </div>
            </div>

            <div className="selected-option-box">
              {/* 시트와 크림 출력 */}
              {[selectedSheet, selectedCream].map((id) => (
                <div key={id} className="selected-group selected-base">
                  <span className="name">{allOptions[id]?.name}</span>
                  <span className="price">
                    + ₩{allOptions[id]?.price.toLocaleString()}
                  </span>
                </div>
              ))}

              {/* 데코 출력 (수량 0개 제외) */}
              {Object.entries(decoCounts).map(
                ([id, count]) =>
                  count > 0 && (
                    <div className="selected-toppings">
                      <span key={id} className="topping-item">
                        <span>
                          {" "}
                          {allOptions[id]?.name} x {count}{" "}
                        </span>
                        <span>
                          {" "}
                          + ₩{(allOptions[id]?.price * count).toLocaleString()}
                        </span>
                      </span>
                    </div>
                  ),
              )}
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
            <button
              className="order-button btn-gray btn"
              onClick={editItem ? handleUpdateCart : handleOrder}
            >
              {editItem ? "UPDATE CART" : "ADD TO CART"}
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
