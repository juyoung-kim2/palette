import "../style.css";
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import OrderSheet from "../Pages/OrderSheet";

function Cart() {
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

  const [checkedItems, setCheckedItems] = useState([]);

  // 전체 선택 체크박스 클릭 시
  const handleAllCheck = (checked) => {
    if (checked) {
      //전체를 클릭하면 모든 아이템의 id를 배열에 넣기
      const idArray = cartList.map((item) => item.id);
      setCheckedItems(idArray);
    } else {
      //체크 해제하면 빈 배열로
      setCheckedItems([]);
    }
  };

  // 개별 체크박스 클릭 시
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      //체크하면 기존 배열에 id 추가
      setCheckedItems((prev) => [...prev, id]);
    } else {
      //체크 해제하면 해당 id만 배열에서 제거
      setCheckedItems((prev) => prev.filter((el) => el !== id));
    }
  };

  const cartList = JSON.parse(localStorage.getItem("cartData")) || [];
  const totalCheckedPrice = cartList
    .filter((item) => checkedItems.includes(item.id))
    .reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  //개별삭제
  const deleteItem = (id) => {
    if (window.confirm("장바구니에서 삭제하시겠습니까?")) {
      //해당 id만 제외한 나머지로 새 배열 만들기
      const updatedCart = cartList.filter((item) => item.id !== id);
      localStorage.setItem("cartData", JSON.stringify(updatedCart));

      //삭제 후 체크박스 상태에서도 해당 id 제거
      setCheckedItems(checkedItems.filter((checked) => checkedId !== id));

      window.location.reload();
    }
  };
  //선택삭제
  const deleteSelected = () => {
    if (checkedItems.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }
    if (
      window.confirm(
        `선택한 ${checkedItems.length}개의 항목을 삭제하시겠습니까?`,
      )
    ) {
      //체크된 id 배열에 포함되지 않은 아이템들만 남기기
      const updatedCart = cartList.filter(
        (item) => !checkedItems.includes(item.id),
      );

      localStorage.setItem("cartData", JSON.stringify(updatedCart));
      //체크박스 비우기
      setCheckedItems([]);

      window.dispatchEvent(new Event("cartUpdate"));
    }
  };

  //장바구니에서 주문서페이지로 넘기기
  const navigator = useNavigate();
  const handleOrderFromCart = () => {
    if (checkedItems.length === 0) {
      alert("주문하실 상품을 선택해 주세요!");
      return;
    }
    const selectedItems = cartList.filter((item) =>
      checkedItems.includes(item.id),
    );
    navigator("/OrderSheet", {
      state: {
        orders: selectedItems,
        totalPrice: totalCheckedPrice,
      },
    });
  };

  //바로구매
  const handleDirectOrder = (item) => {
    navigator("/OrderSheet", {
      state: {
        orders: [item], // 배열 형태로 감싸서 보냄
        totalPrice: item.totalAmount,
      },
    });
  };

  //수정하기
  const handleEdit = (item, idx) => {
    console.log("보낼 데이터 확인:", item);
    navigator("/Order", {
      state: {
        editItem: item,
        editIndex: idx,
      },
    });
  };

  return (
    <>
      <div className="content-wrapper">
        <div id="leftBanner">
          <LeftBanner />
        </div>

        <main className="cart-section main-section">
          <Header variant="sub" openMenu={openMenu} />
          <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />

          <section className="cart-container sub-container">
            <h1>장바구니</h1>

            {/* 선택 체크박스 영역 */}
            <div className="cart-control">
              <label
                className="cart-check-all"
                htmlFor="checkAll"
                style={{ cursor: "pointer" }}
              >
                <input
                  type="checkbox"
                  id="checkAll"
                  onChange={(e) => handleAllCheck(e.target.checked)}
                  checked={
                    checkedItems.length === cartList.length &&
                    cartList.length !== 0
                  }
                />
                <span>전체 선택</span>
              </label>

              <button
                type="button"
                className="btn-delete-selected"
                onClick={deleteSelected}
              >
                선택 삭제
              </button>
            </div>

            {/* 1. 데이터가 있을 때만 보여주는 영역 */}
            {cartList.length > 0 ? (
              <div className="cart-item-wrap">
                {cartList.map((item, idx) => (
                  <div className="cart-item" key={item.id || idx}>
                    <label className="cart-check">
                      <input
                        type="checkbox"
                        onChange={(e) =>
                          handleSingleCheck(e.target.checked, item.id)
                        }
                        //아이템 id가 배열에 들어가있으면 체크 표시
                        checked={checkedItems.includes(item.id)}
                      />
                    </label>

                    <div className="item-thumb">
                      <img src="images/detail_thumb.png" />
                    </div>
                    <div className="item-info">
                      <p className="product-name">Custom Cake</p>
                      <ul className="product-options">
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

                      <p className="product-price">
                        <span className="total-label">TOTAL</span>
                        <span className="total-amount">
                          ₩{item.totalAmount?.toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <div className="btn_wrap">
                      <button
                        className="btn btn-gray sm"
                        onClick={() => handleEdit(item, idx)}
                      >
                        수정하기
                      </button>
                      <button
                        className="btn btn-primary sm"
                        onClick={() => handleDirectOrder(item)}
                      >
                        바로 구매
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => deleteItem(item.id)}
                    >
                      <img src="images/icon_close.png" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              /* 2. 데이터가 없을 때(빈 장바구니) 보여주는 영역 */
              <div className="cart-empty-visual">
                <p>장바구니에 담긴 상품이 없습니다.</p>
                <Link to="/Order" className="btn btn-primary">
                  케이크 만들러 가기
                </Link>
              </div>
            )}
          </section>
          <div className="fixed-bottom-bar">
            <button
              className="order-button btn orderform-btn btn-primary"
              onClick={handleOrderFromCart}
            >
              <span>₩{totalCheckedPrice?.toLocaleString()} </span>결제하기
            </button>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}

export default Cart;
