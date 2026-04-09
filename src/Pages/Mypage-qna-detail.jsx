import "../style.css";
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function MypageQnaDetail() {
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
  return (
    <div className="content-wrapper">
      <div id="leftBanner">
        <LeftBanner />
      </div>

      <main className="mypage-section main-section">
        <Header variant="sub" openMenu={openMenu} />
        <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />
        <section className="mypage-container sub-container is-empty">
          <h1>비밀글입니다.</h1>

          <div className="read-meta">
            <span className="meta-item">작성자</span>
            <span className="meta-item">2025-12-25 10:30</span>
            <span className="badge pending">대기</span>
          </div>
          <div className="read-content">
            문의 내용이 여기에 표시됩니다. 줄바꿈도 그대로 유지됩니다.
          </div>
          <div className="read-attachments">
            <strong>첨부파일</strong>
            <ul>
              <li>image01.jpg</li>
            </ul>
          </div>
          {/*관리자댓글*/}
          <div className="read-answer">
            <div className="answer-head">
              <p>관리자 답변</p>
              <span className="date">2025-12-25 10:30</span>
            </div>
            {/* <div className="answer-content">관리자 답변글입니다.</div>*/}

            <div className="answer-content empty">
              아직 답변이 등록되지 않았습니다.
            </div>
          </div>
          {/*하단 버튼*/}
          <div className="read-actions">
            <Link to="/mypageQnaList" className="btn btn-gray sm">
              목록
            </Link>
            <button className="btn btn-primary sm">수정</button>
            <button className="btn btn-black sm">삭제</button>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default MypageQnaDetail;
