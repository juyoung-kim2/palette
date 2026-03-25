import { Link } from 'react-router-dom'

function LeftBanner() {
  return (
    <section className="banner-section">
      <div className="banner logo"><img src="/images/logo.png" alt="로고" /></div>
      <div className="banner-image-area"><img src="/images/left-banner.png" alt="브랜드 이미지" /></div>
      <Link to='/order' className="banner-btn btn btn-primary">
        <div className="left-wrap"><img src="/images/main-deco02.png" alt="" />케이크 제작하기</div>
        <img src="/images/icon_arrow_r.png" alt="화살표" className="arrow" />
      </Link>
    </section>
  )
}

export default LeftBanner