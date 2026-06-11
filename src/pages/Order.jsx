// components
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import HowToOrderSection from "../components/HowToOrderSection";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import "./Order.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// hooks
import { useState, useMemo, useRef } from "react";
import { useMenuToggle } from "../hooks/useMenuToggle";

// router
import { useNavigate, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";

//data
import {
  CAKE_OPTIONS,
  BASE_PRICE,
  getDecoCountsFromItem,
} from "../data/cakeOptions";

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  const cakeRef = useRef(null);
  const { menuOpen, openMenu, closeMenu } = useMenuToggle();
  const [optionOpen, setOptionOpen] = useState(false);

  const openOption = () => {
    setOptionOpen(true);
  };

  const closeOption = () => {
    setOptionOpen(false);
  };

  const { editItem, editIndex } = location.state || {};
  const [activeTab, setActiveTab] = useState("cakeSheet");

  const [selectedSheet, setSelectedSheet] = useState(
    () => editItem?.sheetId || "sheet-base",
  );
  const [selectedCream, setSelectedCream] = useState(
    () => editItem?.creamId || "cream-base",
  );
  const [lettering, setLettering] = useState(() => editItem?.lettering || "");
  const [decoCounts, setDecoCounts] = useState(() =>
    getDecoCountsFromItem(editItem),
  );
  //옵션 선택에 따른 이미지 변경
  const [changeImg, setChangeImg] = useState(() => {
    if (editItem?.creamId) {
      const cream = CAKE_OPTIONS.cream.find((i) => i.id === editItem.creamId);
      return cream?.img || "detail_thnmb.png";
    }
    return "detail_thnmb.png";
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
  const totalPrice = useMemo(() => {
    const sPrice = allOptions[selectedSheet]?.price || 0;
    const cPrice = allOptions[selectedCream]?.price || 0;
    const dPrice = Object.entries(decoCounts).reduce((acc, [id, count]) => {
      return acc + (allOptions[id]?.price || 0) * count;
    }, 0);
    return BASE_PRICE + sPrice + cPrice + dPrice;
  }, [selectedSheet, selectedCream, decoCounts, allOptions]);

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
            onChange={() => {
              if (type === "sheet") {
                setSelectedSheet(item.id);
                setChangeImg(item.img);
              } else if (type === "cream") {
                setSelectedCream(item.id);
                setChangeImg(item.img);
              }
            }}
          />
          <div className="option-image-box">
            <img src={`/images/${item.img}`} alt="" />
          </div>
          <span className="option-name">{item.name}</span>
          <span className="option-price">+{item.price}</span>

          {type === "deco" && (
            <div className="topping-qty">
              <button
                type="button"
                onClick={() => handleDecoCount(item.id, -1)}
                className="qty-minus"
              >
                -
              </button>
              <span className="qty-value">{decoCounts[item.id]}</span>
              <button
                type="button"
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

  const handleOrder = async () => {
    const canvas = await html2canvas(cakeRef.current);
    const imgData = canvas.toDataURL("image/png");
    const finalOrder = {
      id: Date.now(), // 각 주문을 구분하기 위한 고유 id
      sheetId: selectedSheet,
      creamId: selectedCream,
      sheetName: allOptions[selectedSheet]?.name,
      sheetPrice: allOptions[selectedSheet]?.price,
      creamName: allOptions[selectedCream]?.name,
      creamPrice: allOptions[selectedCream]?.price,
      selectedDeco: Object.entries(decoCounts)
        .filter(([, count]) => count > 0)
        .map(([id, count]) => ({
          id,
          name: allOptions[id]?.name,
          count,
          price: allOptions[id]?.price,
        })),
      lettering: lettering,
      totalAmount: totalPrice,
      cakeImage: imgData,
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
  const handleDirectOrder = async () => {
    const canvas = await html2canvas(cakeRef.current);
    const imgData = canvas.toDataURL("image/png");
    const currentCake = {
      id: Date.now(),
      sheetName: allOptions[selectedSheet]?.name,
      sheetPrice: allOptions[selectedSheet]?.price,
      creamName: allOptions[selectedCream]?.name,
      creamPrice: allOptions[selectedCream]?.price,
      selectedDeco: Object.entries(decoCounts)
        .filter(([, count]) => count > 0)
        .map(([id, count]) => ({
          id,
          name: allOptions[id]?.name,
          count,
          price: allOptions[id]?.price,
        })),
      lettering: lettering,
      totalAmount: totalPrice,
      cakeImage: imgData,
    };
    navigate("/order-sheet", {
      state: {
        orders: [currentCake],
        totalPrice: totalPrice,
      },
    });
  };

  //수정완료
  const handleUpdateCart = async () => {
    const canvas = await html2canvas(cakeRef.current);
    const imgData = canvas.toDataURL("image/png");
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
        .filter(([, count]) => count > 0)
        .map(([id, count]) => ({
          id,
          name: allOptions[id]?.name,
          count,
          price: allOptions[id]?.price,
        })),
      lettering: lettering,
      totalAmount: totalPrice,
      cakeImage: imgData,
    };

    //장바구니 배열에서 해당 인덱스만 교체하기
    const newCartList = [...currentCart];
    newCartList[editIndex] = updatedOrder;
    localStorage.setItem("cartData", JSON.stringify(newCartList));
    navigate("/cart");
  };

  //레터링 폰트 색상 지정
  const letteringColors = {
    "cream-base": "#5c3d2e", // 생크림 → 브라운
    "cream-choco": "#fff", // 초코 크림 → 화이트
    "cream-strawberry": "#fff", // 딸기 크림 → 화이트
    "cream-sesame": "#fff", // 흑임자 → 화이트
  };
  return (
    <div className="content-wrapper">
      <div id="leftBanner">
        <LeftBanner />
      </div>

      <main className="product-section detail-page-wrapper main-section">
        <Header variant="sub" openMenu={openMenu} />
        <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />

        <div className="main-image-area" ref={cakeRef}>
          <img src={`/images/${changeImg}`} alt="상품썸네일" />
          {Object.entries(decoCounts)
            .filter(([id, count]) => count > 0)
            .map(([id]) => (
              <img
                key={id}
                src={`/images/${allOptions[id]?.previewImg}`}
                alt=""
                className="deco-layer"
              ></img>
            ))}
          {lettering && (
            <span
              className="cake-lettering"
              style={{ color: letteringColors[selectedCream] }}
            >
              {lettering}
            </span>
          )}
        </div>
        <div className="product-info-section">
          <h1 className="title">Custom Cake</h1>
          <p className="price">₩{BASE_PRICE.toLocaleString()}</p>
          <p className="description">
            케이크의 모양, 색은 물론이고 당사의 핸들링 공법이 조합된 보세요.
            전달받은 이야기를 바탕으로, 오직 당신만을 위한 케이크를 정성껏
            제작합니다.
          </p>
        </div>

        <HowToOrderSection />

        <div className="fixed-bottom-bar">
          <button
            type="button"
            className="order-button btn btn-primary"
            onClick={openOption}
          >
            ORDER NOW
          </button>
        </div>

        <div className={`option-popup-layer ${optionOpen ? "active" : ""}`}>
          <div className="popup-content scroll">
            <div className="popup-handle" onClick={closeOption}>
              <div className="bar"></div>
            </div>

            <nav className="option-tabs">
              {Object.keys(CAKE_OPTIONS)
                .concat("Lettering")
                .map((tab) => (
                  <button
                    type="button"
                    key={tab}
                    className={`tab-item ${activeTab === tab ? "active" : ""}`}
                    onClick={() => {
                      setActiveTab(tab);
                      if (tab === "cakeSheet")
                        setChangeImg(allOptions[selectedSheet].img);
                      if (
                        tab === "cream" ||
                        tab === "deco" ||
                        tab === "Lettering"
                      )
                        setChangeImg(allOptions[selectedCream].img);
                    }}
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
                  aria-label="케이크 레터링 문구 입력"
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
                    <div key={id} className="selected-toppings">
                      <span className="topping-item">
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
              type="button"
              className="order-button btn-gray btn"
              onClick={editItem ? handleUpdateCart : handleOrder}
            >
              {editItem ? "UPDATE CART" : "ADD TO CART"}
            </button>
            <button
              type="button"
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
