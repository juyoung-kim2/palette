import "../style.css";
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Mypage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const openMenu = (e) => {
    e.preventDefault();
    setMenuOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="content-wrapper">
      <div id="leftBanner">
        <LeftBanner />
      </div>

      <main className="mypage-section main-section">
        <Header variant="sub" openMenu={openMenu} />
        <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />

        <section className="mypage-container sub-container is-empty">
          <h1>마이페이지</h1>
          <p className="intro">
            안녕하세요, <span>사용자</span>님 :)
          </p>

          <div className="order-summary">
            <h3>주문현황</h3>
            <div className="order-wrap">
              <div className="item">
                <span className="label">주문완료</span>
                <strong>2</strong>
              </div>
              <div className="item">
                <span className="label">픽업대기</span>
                <strong>5</strong>
              </div>
              <div className="item">
                <span className="label">픽업완료</span>
                <strong>1</strong>
              </div>
            </div>
          </div>

          <div className="order-desc">
            <h3>
              {/* 1. 링크 수정: /mypageOrderDetail -> /mypage-order-detail */}
              <Link to="/mypage-order-detail">
                다가오는 픽업
                <img
                  src="/images/icon_arrow_r.png"
                  className="arrow"
                  alt="화살표"
                />
              </Link>
            </h3>
            <p>
              12월 25일 14:00
              <br />
              <span>Custom Cake</span>
            </p>
          </div>

          <ul className="mypage-menu">
            <li>
              {/* 2. 링크 수정: /mypageOrderList -> /mypage-order-list */}
              <Link to="/mypage-order-list">
                <img src="/images/icon-order.png" alt="주문내역 아이콘" />
                주문내역
                <img
                  src="/images/icon_arrow_r.png"
                  alt="화살표"
                  className="arrow"
                />
              </Link>
            </li>
            <li>
              {/* 3. 링크 수정: /mypageQnaList -> /mypage-qna-list */}
              <Link to="/mypage-qna-list">
                <img src="/images/icon-qna.png" alt="문의내역 아이콘" />
                1:1 문의
                <img
                  src="/images/icon_arrow_r.png"
                  alt="화살표"
                  className="arrow"
                />
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert(
                    "준비 중인 기능입니다. 상세 페이지와 장바구니 기능을 먼저 확인해 보세요!",
                  );
                }}
              >
                <img src="/images/icon-rock.png" alt="비밀번호 변경 아이콘" />
                비밀번호 변경
                <img
                  src="/images/icon_arrow_r.png"
                  alt="화살표"
                  className="arrow"
                />
              </Link>
            </li>
          </ul>

          <Link to="/order" className="btn btn-primary">
            케이크 제작하기
          </Link>
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default Mypage;
