// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay } from 'swiper/modules';

function HeroSection() {
  return (
    <section className="main-hero">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          type: 'progressbar',
        }}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img src="/images/main-banner.png" alt="배너01" />
          <div className="text-wrap">
            <h2>Design <br />Every Detail</h2>
            <div className="btn sm btn-primary"><a href="#">Order Now</a></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/main-banner02.png" alt="배너02" />
          <div className="text-wrap">
            <h2>Your Cake, <br />Your Every Detail</h2>
            <div className="btn sm btn-primary"><a href="#">Order Now</a></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/images/main-banner.png" alt="배너03" />
          <div className="text-wrap">
            <h2>Design <br />Every Detail</h2>
            <div className="btn sm btn-primary"><a href="#">Order Now</a></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default HeroSection