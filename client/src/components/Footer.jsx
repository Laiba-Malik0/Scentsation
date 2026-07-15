import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      data-aos="fade-up"
      className="bg-black text-white py-14"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

          <div>

            <h2 className="text-3xl sm:text-4xl font-serif mb-5">
              SCENTASIA
            </h2>

            <p className="text-gray-400 leading-7">
              Luxury fragrances crafted with elegance,
              passion and timeless sophistication.
            </p>

          </div>

          <div>

            <h3 className="text-2xl font-serif mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li><a href="#home" className="hover:text-[#C9A96E]">Home</a></li>

              <li><a href="#shop" className="hover:text-[#C9A96E]">Shop</a></li>

              <li><a href="#men" className="hover:text-[#C9A96E]">Men</a></li>

              <li><a href="#women" className="hover:text-[#C9A96E]">Women</a></li>

              <li><a href="#contact" className="hover:text-[#C9A96E]">Contact</a></li>

            </ul>

          </div>

          <div>

            <h3 className="text-2xl font-serif mb-5">
              Follow Us
            </h3>

            <div className="flex justify-center md:justify-start gap-4">

              <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#C9A96E] hover:text-white duration-300 cursor-pointer">
                <FaFacebookF />
              </div>

              <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#C9A96E] hover:text-white duration-300 cursor-pointer">
                <FaInstagram />
              </div>

              <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#C9A96E] hover:text-white duration-300 cursor-pointer">
                <FaTiktok />
              </div>

            </div>

          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          © 2026 SCENTASIA. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
};

export default Footer;