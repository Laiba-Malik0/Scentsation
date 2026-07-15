const LuxuryBanner = () => {
  return (
    <section
      data-aos="fade-up"
      className="relative h-[70vh] sm:h-[80vh] lg:h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: "url('/banner.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-5 sm:px-8">

        <p className="uppercase tracking-[3px] sm:tracking-[6px] text-[#C9A96E] text-xs sm:text-sm mb-3">
          Luxury Fragrances
        </p>

        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-serif leading-tight">
          Discover Your
          <br />
          Signature Scent
        </h2>

        <p className="mt-5 max-w-2xl text-sm sm:text-base text-gray-200 leading-7">
          Crafted with elegance, inspired by timeless luxury and made for
          unforgettable moments.
        </p>

        <a
          href="#shop"
          className="mt-8 px-6 sm:px-8 py-3 border border-white rounded-full hover:bg-[#C9A96E] hover:border-[#C9A96E] duration-300"
        >
          Explore
        </a>

      </div>
    </section>
  );
};

export default LuxuryBanner;