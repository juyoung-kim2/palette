// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="main-hero">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          type: "progressbar",
        }}
        slidesPerView={1}
        loop={true}
        speed={1500}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <Link to={"/"}>
            <img src="/images/main-banner.png" alt="" aria-hidden="true" />
            <div className="text-wrap">
              <h2>
                Design <br />
                Every Detail
              </h2>
              <div className="btn sm btn-primary">Order Now</div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/cart"}>
            <img src="/images/main-banner02.png" alt="" aria-hidden="true" />
            <div className="text-wrap">
              <h2>
                Your Cake, <br />
                Your Every Detail
              </h2>
              <div className="btn sm btn-primary">Order Now</div>
            </div>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/mypage"}>
            <img src="/images/main-banner.png" alt="" aria-hidden="true" />
            <div className="text-wrap">
              <h2>
                Design <br />
                Every Detail
              </h2>
              <div className="btn sm btn-primary">Order Now</div>
            </div>
          </Link>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}

export default HeroSection;
