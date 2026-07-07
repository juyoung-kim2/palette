// components
import LeftBanner from "../components/LeftBanner";
import HeroSection from "../components/HeroSection";
import BrandSection from "../components/BrandSection";
import HowToOrderSection from "../components/HowToOrderSection";
import FAQSection from "../components/FAQSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideMenu from "../components/SideMenu";
import "./Home.css";

// hooks
import { useMenuToggle } from "../hooks/useMenuToggle";
import { usePopupExpiry } from "../hooks/usePopupExpiry";

function Home() {
  const { menuOpen, openMenu, closeMenu } = useMenuToggle();
  const { showNotice, setShowNotice, handleClosePopup } = usePopupExpiry();
  return (
    <>
      {/* 포트폴리오 안내 팝업 */}
      {showNotice && (
        <div className="portfolio-notice-overlay">
          <div
            className="portfolio-notice-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
          >
            <h2 id="popup-title">Project Information</h2>
            <button
              className="btn-close"
              onClick={() => setShowNotice(false)}
              aria-label="팝업 닫기"
            >
              <img src="/images/icon_close.png" alt="" />
            </button>
            <div className="notice-content">
              <p>
                <strong>Development</strong>
                <br />• React State & LocalStorage 연동 구매 시스템
                <br />• 브라우저 저장공간 특성상 데모 환경에서는 상품 1~2개로
                테스트 권장
              </p>
              <br />
              <p>
                <strong>Design & Pub</strong>
                <br />
                • 마이페이지 및 세부 UI 컴포넌트 설계 완료
                <br />• 사용자 경험(UX) 중심의 인터랙티브 프로토타입
              </p>
            </div>
            <div className="btn-wrap">
              <button
                onClick={() => setShowNotice(false)}
                className="btn sm btn-primary"
              >
                사이트 둘러보기
              </button>
              <button className="btn sm btn-gray" onClick={handleClosePopup}>
                오늘 하루 보지 않기
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="content-wrapper">
        <div id="leftBanner">
          <LeftBanner />
        </div>

        <main className="main-section">
          <h1 className="blind">팔레트 케이크 - 커스텀 케이크 주문</h1>
          {/* 헤더에 메뉴 오픈 함수 전달 */}
          <Header variant="main" openMenu={openMenu} />
          {/* 사이드메뉴 */}
          <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />

          <HeroSection />
          <BrandSection />
          <HowToOrderSection />
          <FAQSection />

          {/* 흐르는 텍스트 애니메이션 (Marquee) */}
          <div className="text-marquee" aria-hidden="true">
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
