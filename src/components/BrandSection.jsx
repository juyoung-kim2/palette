import { Link } from "react-router-dom";

function BrandSection() {
  return (
    <section className="brand-section">
      <div className="typo-area">
        <div>
          <h2>Crafter for your</h2>
        </div>
        <div>
          <img
            src="/images/main-deco01.png"
            alt=""
            aria-hidden="true"
            className="typo-deco"
          />

          <h2>Sweetest Moments</h2>
        </div>
      </div>
      <Link to="/order">
        <div className="imgage-area">
          <img
            src="/images/main-deco02.png"
            alt=""
            aria-hidden="true"
            className="deco-img01 move"
          />
          <img
            src="/images/main-deco03.png"
            alt=""
            aria-hidden="true"
            className="deco-img02 move"
          />
          <img
            src="/images/main-deco-arrow.png"
            alt=""
            aria-hidden="true"
            className="deco-img03"
          />
          <img
            src="/images/brand-section-img.png"
            alt="브랜드 대표 이미지"
            className="main"
          />

          <span className="btn sm btn-primary">Order Now</span>
        </div>
      </Link>
    </section>
  );
}

export default BrandSection;
