// components
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import "./Mypage.css";
// hooks
import { useEffect, useState } from "react";

// router
import { useNavigate } from "react-router-dom";

function MypageQnaList() {
  const [menuOpen, setMenuOpen] = useState(false);

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

  const openMenu = (e) => {
    e.preventDefault();
    setMenuOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const navigate = useNavigate();
  return (
    <div className="content-wrapper">
      <div id="leftBanner">
        <LeftBanner />
      </div>

      <main className="mypage-section main-section">
        <Header variant="sub" openMenu={openMenu} />
        <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />
        <section className="mypage-container sub-container is-empty">
          <h1>1:1 문의 내역</h1>

          <div className="board-wrap board-list">
            {/*필터영역*/}
            <div className="board-filter">
              {/*검색*/}
              <div className="filter-right">
                <select
                  className="filter-select filter-search-type"
                  aria-label="검색 조건 선택"
                >
                  <option value="title">제목</option>
                  <option value="content">내용</option>
                  <option value="writer">작성자</option>
                </select>

                <input
                  type="text"
                  className="filter-input"
                  aria-label="게시판 검색어 입력"
                  placeholder="검색어를 입력해주세요"
                />

                <button className="btn">
                  <img src="images/icon_search.png" alt="검색" />
                </button>
              </div>
            </div>
            <div className="board-container">
              {/*
               <div className="board-empty">등록된 게시글이 없습니다.</div>
               */}

              <table className="board-table">
                <thead>
                  <tr>
                    {/*공통*/}
                    <th className="col-subject">제목</th>
                    <th className="col-writer">작성자</th>
                    <th className="col-date">작성일</th>
                  </tr>
                </thead>

                <tbody>
                  <tr onClick={() => navigate("/mypage-qna-detail")}>
                    <td className="col-answer badge pending">대기</td>
                    <td className="col-subject">비밀글입니다.</td>
                    <td className="col-writer">작성자</td>
                    <td className="col-date">2025-12-25</td>
                  </tr>
                </tbody>
              </table>

              {/* 페이지네이션  */}
              <div
                className="paginate"
                aria-label="페이지 선택"
                role="navigation"
              >
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
              <button
                className="btn btn-primary write-btn"
                onClick={() =>
                  alert(
                    "준비 중인 기능입니다. 상세 페이지와 장바구니 기능을 먼저 확인해 보세요!",
                  )
                }
              >
                글쓰기
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default MypageQnaList;
