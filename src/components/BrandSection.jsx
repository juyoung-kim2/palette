import { Link } from "react-router-dom";

function BrandSection() {
  return (
    <section className="brand-section">
      <div className="typo-area">
        <div>
          <h1>Crafter for your</h1>
        </div>
        <div>
          <img src="/images/main-deco01.png" alt="deco" className="typo-deco" />
          {/* 오타 수정: Sweetes -> Sweetest */}
          <h1>Sweetest Moments</h1>
        </div>
      </div>
      <div className="imgage-area">
        <img
          src="/images/main-deco02.png"
          alt="deco"
          className="deco-img01 move"
        />
        <img
          src="/images/main-deco03.png"
          alt="deco"
          className="deco-img02 move"
        />
        <img
          src="/images/main-deco-arrow.png"
          alt="deco"
          className="deco-img03"
        />
        <img
          src="/images/brand-section-img.png"
          alt="브랜드 대표 이미지"
          className="main"
        />
        {/* Link의 to 속성을 더 간결하게 수정 */}
        <Link to="/order" className="btn sm btn-primary">
          Order Now
        </Link>
      </div>
    </section>
  );
}

export default BrandSection;
