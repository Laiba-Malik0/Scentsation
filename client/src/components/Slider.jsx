import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import slide1 from "../assets/slider1.png";
import slide2 from "../assets/slider2.png";
import slide3 from "../assets/slider3.png";

const slides = [
  {
    image: slide1,
    title: "Luxury in Every Drop",
    subtitle: "Discover timeless fragrances crafted for elegance.",
  },
  {
    image: slide2,
    title: "A Signature of Elegance",
    subtitle: "Premium perfumes designed for unforgettable moments.",
  },
  {
    image: slide3,
    title: "Crafted for Him & Her",
    subtitle: "Exclusive scents that define your personality.",
  },
];

const Slider = () => {
  return (
    <Swiper
      id="home"
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      loop={true}
      className="h-[100svh]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative h-[100svh] bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30"></div>

            {/* Content */}
            <div className="relative z-10 flex items-center h-full">
              <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12">

                <div className="max-w-xl lg:max-w-2xl">

                  <p className="uppercase tracking-[3px] sm:tracking-[6px] text-[#C9A96E] mb-3 text-xs sm:text-sm md:text-base">
                    Premium Fragrance
                  </p>

                  <h1 className="text-white font-serif leading-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                    {slide.title}
                  </h1>

                  <p className="text-gray-200 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg leading-7">
                    {slide.subtitle}
                  </p>

                  <a
                    href="#shop"
                    className="inline-block mt-8 sm:mt-10 bg-[#C9A96E] hover:bg-[#b69258] duration-300 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base tracking-wide"
                  >
                    Explore Collection
                  </a>

                </div>

              </div>
            </div>

          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;