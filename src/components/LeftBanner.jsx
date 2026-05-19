import { Link } from "react-router-dom";

function LeftBanner() {
  return (
    <div className="banner-section">
      <div className="banner-logo">
        <img src="/images/logo.svg" alt="팔레트 로고" />
      </div>
      <div className="banner-image-area">
        <img src="/images/left-banner.png" alt="브랜드 이미지" />
      </div>
      <Link to="/order" className="banner-btn btn btn-primary" role="button">
        <div className="left-wrap">
          <img src="/images/faq-icon03.png" alt="" aria-hidden="true" />
          케이크 제작하기
        </div>
        <img src="/images/icon_arrow_r.png" alt="화살표" className="arrow" />
      </Link>
    </div>
  );
}

export default LeftBanner;
