import "../style.css";
import LeftBanner from "../components/LeftBanner";
import HeroSection from "../components/HeroSection";
import BrandSection from "../components/BrandSection";
import HowToOrderSection from "../components/HowToOrderSection";
import FAQSection from "../components/FAQSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Order from "../Pages/Order";

import { useEffect } from "react";
import { initSite } from "../js/script";
import FaqItem from "../components/FaqItem";
import SideMenu from "../components/SideMenu";
function App() {
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

  const [showNotice, setShowNotice] = useState(true);

  return (
    <>
      {showNotice && (
        <div className="portfolio-notice-overlay">
          <div className="portfolio-notice-modal">
            <h2>Project Information</h2>
            <p>
              Development<br></br>• React State & LocalStorage 연동 구매 시스템
              <br></br>
              <br></br>
              Design & Pub<br></br>• 마이페이지 및 세부 UI 컴포넌트 설계 완료
              <br></br>• 사용자 경험(UX) 중심의 인터랙티브 프로토타입
            </p>
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
          <Header variant="main" openMenu={openMenu} />
          <SideMenu menuOpen={menuOpen} closeMenu={closeMenu} />
          <HeroSection />
          <BrandSection />
          <HowToOrderSection />
          <FAQSection />
          <div className="text-marquee">
            <div className="marquee-content">
              <span>Custom cake for your moment &nbsp;&nbsp; •</span>
              <span>Palette cake series &nbsp;&nbsp; •</span>
              <span>Design Your Own Cake &nbsp;&nbsp; • </span>
              {/* 똑같은 내용을 한 번 더 써서 빈틈을 채워줍니다 */}
              <span>Custom cake for your moment &nbsp;&nbsp; •</span>
              <span>Palette cake series &nbsp;&nbsp; • </span>
              <span>Design Your Own Cake &nbsp;&nbsp; • </span>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
