// components
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import "./Mypage.css";
// hooks
import { useMenuToggle } from "../hooks/useMenuToggle";
import { useNavigate } from "react-router-dom";

// router
import { Link } from "react-router-dom";
import { useState } from "react";

function MypageQnaWrite() {
  const { menuOpen, openMenu, closeMenu } = useMenuToggle();
  const [qnaTitle, setQnaTitle] = useState("");
  const [qnaContent, setQnaContent] = useState("");
  const navigate = useNavigate();
  const handleRegist = () => {
    if (!qnaTitle.trim()) return alert("제목을 입력해주세요");
    if (!qnaContent.trim()) return alert("내용을 입력해주세요");
    const newQna = {
      id: Date.now(),
      title: qnaTitle,
      content: qnaContent,
      status: "대기",
      date: new Date().toISOString().slice(0, 10),
    };
    const existing = JSON.parse(localStorage.getItem("qnaList")) || [];
    localStorage.setItem("qnaList", JSON.stringify([newQna, ...existing]));
    navigate("/mypage-qna-list");
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
          <h1>1:1 문의</h1>
          <div className="form-group">
            <label htmlFor="qnaSubject">제목</label>
            <input
              value={qnaTitle}
              onChange={(e) => setQnaTitle(e.target.value)}
              className="subject"
              type="text"
              name=""
              id="qnaSubject"
            />
          </div>

          <div className="form-group">
            <label htmlFor="qnaContent">내용</label>
            <textarea
              id="qnaContent"
              value={qnaContent}
              onChange={(e) => setQnaContent(e.target.value)}
            ></textarea>
          </div>

          {/* 하단 버튼 영역 */}
          <div className="read-actions">
            <Link to="/mypage-qna-list" className="btn btn-gray sm">
              취소
            </Link>
            <button className="btn btn-primary sm" onClick={handleRegist}>
              등록
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default MypageQnaWrite;
