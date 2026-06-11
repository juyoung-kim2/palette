// components
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import "./Mypage.css";
// hooks
import { useMenuToggle } from "../hooks/useMenuToggle";
import { useState } from "react";

// router
import { Link } from "react-router-dom";

function MypageOrderList() {
  const { menuOpen, openMenu, closeMenu } = useMenuToggle();

  // 주문목록 데이터를 상태로 관리
  const [orderList, setOrderList] = useState(() => {
    return JSON.parse(localStorage.getItem("orderHistory")) || [];
  });

  return (
    <div className="content-wrapper">
      <div id="leftBanner">
        <LeftBanner />
      </div>

      <main className="mypage-section main-section">
        <Header variant="sub" openMenu={openMenu} />
        <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />

        <section className="mypage-container sub-container is-empty">
          <h1>주문내역</h1>

          {orderList.length > 0 ? (
            <div className="card-wrap">
              {orderList.map((order, idx) => (
                <div className="order-card" key={order.id || idx}>
                  <div className="order-header">
                    <span className="order-date">{order.id} </span>

                    <Link
                      to="/mypage-order-detail"
                      className="order-detail-link"
                      state={{ order: order }}
                    >
                      상세보기{" "}
                      <img src="/images/icon_arrow_r.png" alt="화살표" />
                    </Link>
                  </div>

                  {order.items.map((item, idx) => (
                    <div className="order-product" key={idx}>
                      <div className="product-thumb">
                        <img src={item.cakeImage} alt="상품 이미지" />
                      </div>

                      <div className="product-info">
                        <p className="product-name">
                          Custom Cake
                          <span>₩{order.totalPrice.toLocaleString()}</span>
                        </p>
                        <p className="pickup-info">
                          {order.pickupDate} {order.pickupTime} 픽업
                        </p>
                        <p className="product-request">
                          요청사항 : {order.request}
                        </p>
                        <ul className="product-options">
                          <li>
                            <span>{item.sheetName}</span>
                            <span>+ ₩{item.sheetPrice?.toLocaleString()}</span>
                          </li>
                          <li>
                            <span>{item.creamName}</span>
                            <span>+ ₩{item.creamPrice?.toLocaleString()}</span>
                          </li>
                          {item.selectedDeco.map((deco, idx) => (
                            <li>
                              <span>
                                {deco.name} x{deco.count}
                              </span>
                              <span>
                                + ₩{(deco.price * deco.count).toLocaleString()}
                              </span>
                            </li>
                          ))}
                          <li>
                            <span>레터링 문구</span>
                            <span>{item.lettering}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))}

                  <div className="order-status">
                    <strong className="status-text">주문상태</strong>
                    <span className="badge completed">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="cart-empty-visual">
              <p>주문 내역이 없습니다.</p>
            </div>
          )}

          {/* 페이지네이션  */}
          <div className="paginate" aria-label="페이지 선택" role="navigation">
            <button
              type="button"
              className="first"
              aria-label="처음 페이지로 이동"
            ></button>
            <button
              type="button"
              className="prev"
              aria-label="이전 페이지로 이동"
            ></button>
            <ol>
              <li>
                <button type="button" className="page-num">
                  1
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="page-num selected"
                  aria-current="page"
                >
                  2
                </button>
              </li>
              <li>
                <button type="button" className="page-num">
                  3
                </button>
              </li>
            </ol>
            <button
              type="button"
              className="next"
              aria-label="다음 페이지로 이동"
            ></button>
            <button
              type="button"
              className="last"
              aria-label="마지막 페이지로 이동"
            ></button>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default MypageOrderList;
