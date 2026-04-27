import { useState, useEffect } from "react";
import "../style.css";
import LeftBanner from "../components/LeftBanner";
import HeroSection from "../components/HeroSection";
import BrandSection from "../components/BrandSection";
import HowToOrderSection from "../components/HowToOrderSection";
import FAQSection from "../components/FAQSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideMenu from "../components/SideMenu";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNotice, setShowNotice] = useState(true);

  // 메뉴 오픈 시 스크롤 방지
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
    <>
      {/* 포트폴리오 안내 팝업 */}
      {showNotice && (
        <div className="portfolio-notice-overlay">
          <div className="portfolio-notice-modal">
            <h2>Project Information</h2>
            <div className="notice-content">
              <p>
                <strong>Development</strong>
                <br />• React State & LocalStorage 연동 구매 시스템
              </p>
              <br />
              <p>
                <strong>Design & Pub</strong>
                <br />
                • 마이페이지 및 세부 UI 컴포넌트 설계 완료
                <br />• 사용자 경험(UX) 중심의 인터랙티브 프로토타입
              </p>
            </div>
            <button
              onClick={() => setShowNotice(false)}
              className="btn sm btn-primary"
            >
              사이트 둘러보기
            </button>
          </div>
        </div>
      )}

      <div className="content-wrapper">
        <div id="leftBanner">
          <LeftBanner />
        </div>

        <main className="main-section">
          {/* 헤더에 메뉴 오픈 함수 전달 */}
          <Header variant="main" openMenu={openMenu} />
          {/* 사이드메뉴 */}
          <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />

          <HeroSection />
          <BrandSection />
          <HowToOrderSection />
          <FAQSection />

          {/* 흐르는 텍스트 애니메이션 (Marquee) */}
          <div className="text-marquee">
            <div className="marquee-content">
              <span>
                Custom cake for your moment &nbsp;&nbsp; • &nbsp;&nbsp;
              </span>
              <span>Palette cake series &nbsp;&nbsp; • &nbsp;&nbsp;</span>
              <span>Design Your Own Cake &nbsp;&nbsp; • &nbsp;&nbsp;</span>
              <span>
                Custom cake for your moment &nbsp;&nbsp; • &nbsp;&nbsp;
              </span>
              <span>Palette cake series &nbsp;&nbsp; • &nbsp;&nbsp;</span>
              <span>Design Your Own Cake &nbsp;&nbsp; • &nbsp;&nbsp;</span>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}

export default Home;
