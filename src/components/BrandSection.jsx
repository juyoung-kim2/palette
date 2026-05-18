import { Link } from "react-router-dom";

function BrandSection() {
  return (
    <section className="brand-section">
      <div className="typo-area">
        <div>
          <h1>Crafter for your</h1>
        </div>
        <div>
          <img
            src="/images/main-deco01.png"
            alt=""
            aria-hidden="true"
            className="typo-deco"
          />

          <h1>Sweetest Moments</h1>
        </div>
      </div>
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
          alt=""
          alt="브랜드 대표 이미지"
          className="main"
        />

        <Link to="/order" className="btn sm btn-primary">
          Order Now
        </Link>
      </div>
    </section>
  );
}

export default BrandSection;
