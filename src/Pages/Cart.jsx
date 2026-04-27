import "../style.css";
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import OrderSheet from "../Pages/OrderSheet";

function Cart() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // 2. 누락되었던 상태 선언 추가
  const [checkedItems, setCheckedItems] = useState([]);

  // 3. 장바구니 데이터를 상태로 관리
  const [cartList, setCartList] = useState(() => {
    return JSON.parse(localStorage.getItem("cartData")) || [];
  });

  // 4. 전체 선택 여부 및 총액 계산 (useMemo 최적화)
  const isAllChecked = useMemo(() => {
    return cartList.length > 0 && checkedItems.length === cartList.length;
  }, [cartList, checkedItems]);

  const totalCheckedPrice = useMemo(() => {
    return cartList
      .filter((item) => checkedItems.includes(item.id))
      .reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  }, [cartList, checkedItems]);

  // 로컬 스토리지 업데이트 유틸
  const updateCartStorage = (newCart) => {
    setCartList(newCart);
    localStorage.setItem("cartData", JSON.stringify(newCart));
  };

  // 핸들러 함수들
  const handleAllCheck = (checked) => {
    setCheckedItems(checked ? cartList.map((item) => item.id) : []);
  };

  const handleSingleCheck = (id) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((el) => el !== id) : [...prev, id],
    );
  };

  const deleteItem = (id) => {
    if (!window.confirm("장바구니에서 삭제하시겠습니까?")) return;
    const updatedCart = cartList.filter((item) => item.id !== id);
    updateCartStorage(updatedCart);
    setCheckedItems((prev) => prev.filter((item) => item !== id));
  };

  const deleteSelected = () => {
    if (checkedItems.length === 0) return alert("삭제할 항목을 선택해주세요.");
    if (
      !window.confirm(
        `선택한 ${checkedItems.length}개의 항목을 삭제하시겠습니까?`,
      )
    )
      return;
    const updatedCart = cartList.filter(
      (item) => !checkedItems.includes(item.id),
    );
    updateCartStorage(updatedCart);
    setCheckedItems([]);
  };

  const handleOrderFromCart = () => {
    if (checkedItems.length === 0)
      return alert("주문하실 상품을 선택해 주세요!");
    const selectedItems = cartList.filter((item) =>
      checkedItems.includes(item.id),
    );
    navigate("/OrderSheet", {
      state: { orders: selectedItems, totalPrice: totalCheckedPrice },
    });
  };

  const handleDirectOrder = (item) => {
    navigate("/OrderSheet", {
      state: { orders: [item], totalPrice: item.totalAmount },
    });
  };

  const handleEdit = (item, idx) => {
    navigate("/Order", { state: { editItem: item, editIndex: idx } });
  };

  // 메뉴 열릴 때 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);
  return (
    <div className="content-wrapper">
      <div id="leftBanner">
        <LeftBanner />
      </div>

      <main className="cart-section main-section">
        <Header
          variant="sub"
          openMenu={(e) => {
            e.preventDefault();
            setMenuOpen(true);
          }}
        />
        <SideMenu menuOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />

        <section className="cart-container sub-container">
          <h1>장바구니</h1>

          <div className="cart-control">
            <label className="cart-check-all" style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                onChange={(e) => handleAllCheck(e.target.checked)}
                checked={isAllChecked}
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

          {cartList.length > 0 ? (
            <div className="cart-item-wrap">
              {cartList.map((item, idx) => (
                <div className="cart-item" key={item.id || idx}>
                  <label className="cart-check">
                    <input
                      type="checkbox"
                      onChange={() => handleSingleCheck(item.id)} // id만 넘기도록 수정
                      checked={checkedItems.includes(item.id)}
                    />
                  </label>

                  <div className="item-thumb">
                    <img src="/images/detail_thnmb.png" alt="상품 이미지" />
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
                      {item.selectedDeco?.map((deco, index) => (
                        <li key={index}>
                          <span>
                            {deco.name} x{deco.count}
                          </span>
                          <span>
                            + ₩{(deco.price * deco.count).toLocaleString()}
                          </span>
                        </li>
                      ))}
                      {item.lettering && (
                        <li>
                          <span>레터링 문구</span>
                          <span>{item.lettering}</span>
                        </li>
                      )}
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
                    <img src="images/icon_close.png" alt="삭제" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
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
  );
}

export default Cart;
