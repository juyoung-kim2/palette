// components
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import "./Mypage.css";
// hooks
import { useMenuToggle } from "../hooks/useMenuToggle";

// router
import { useLocation, useNavigate, Link } from "react-router-dom";

function MypageQnaDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { menuOpen, openMenu, closeMenu } = useMenuToggle();
  const { qna } = location.state || {};
  const deleteQna = () => {
    if (!window.confirm("삭제하시겠습니까?")) return;
    const exisiting = JSON.parse(localStorage.getItem("qnaList")) || [];
    const updateQna = exisiting.filter((item) => item.id !== qna.id);
    localStorage.setItem("qnaList", JSON.stringify(updateQna));
    navigate("/mypage-qna-list");
  };
  const modifyQna = () => {
    navigate("/mypage-qna-write", {
      state: { modifyQna: qna },
    });
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
          <h1>{qna.title}</h1>

          <div className="read-meta">
            <span className="meta-item">작성자</span>
            <span className="meta-item">{qna.date}</span>
            <span className="badge pending">{qna.status}</span>
          </div>

          <div className="read-content">{qna.content}</div>

          {/* 관리자 댓글 영역 */}
          <div className="read-answer">
            <div className="answer-head">
              <p>관리자 답변</p>
            </div>

            <div className="answer-content empty">
              아직 답변이 등록되지 않았습니다.
            </div>
          </div>

          {/* 하단 버튼 영역 */}
          <div className="read-actions">
            <Link to="/mypage-qna-list" className="btn btn-gray sm">
              목록
            </Link>
            <button
              type="button"
              className="btn btn-primary sm"
              onClick={modifyQna}
            >
              수정
            </button>
            <button
              type="button"
              className="btn btn-black sm"
              onClick={deleteQna}
            >
              삭제
            </button>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

export default MypageQnaDetail;
