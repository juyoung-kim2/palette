import "../style.css";
import LeftBanner from "../components/LeftBanner";
import Header from "../components/Header";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import { useEffect, useState } from "react"; // useState 임포트 위치 정리
import { Link } from "react-router-dom";

function MypageQnaDetail() {
  const [menuOpen, setMenuOpen] = useState(false);

  // 메뉴 오픈 시 스크롤 방지 로직 (일관성 있게 정리)
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
          <h1>비밀글입니다.</h1>

          <div className="read-meta">
            <span className="meta-item">작성자</span>
            <span className="meta-item">2025-12-25 10:30</span>
            <span className="badge pending">대기</span>
          </div>

          <div className="read-content">
            {/* 실제 데이터 연동 시에는 공백 유지를 위해 white-space: pre-wrap; 스타일이 CSS에 있으면 좋아요! */}
            문의 내용이 여기에 표시됩니다. 줄바꿈도 그대로 유지됩니다.
          </div>

          <div className="read-attachments">
            <strong>첨부파일</strong>
            <ul>
              {/* 이미지 파일이면 미리보기나 아이콘이 있으면 더 좋겠네요! */}
              <li>
                <img
                  src="/images/icon_file.png"
                  alt=""
                  style={{
                    display: "inline",
                    width: "14px",
                    marginRight: "5px",
                  }}
                />{" "}
                image01.jpg
              </li>
            </ul>
          </div>

          {/* 관리자 댓글 영역 */}
          <div className="read-answer">
            <div className="answer-head">
              <p>관리자 답변</p>
              <span className="date">2025-12-25 10:30</span>
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
            <button type="button" className="btn btn-primary sm">
              수정
            </button>
            <button
              type="button"
              className="btn btn-black sm"
              onClick={() => window.confirm("정말 삭제하시겠습니까?")}
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
