import { useState, useEffect } from "react";
import {
  FaHeart,
  FaShoppingBag,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", link: "#home" },
  { name: "Shop", link: "#shop" },
  { name: "Men", link: "#men" },
  { name: "Women", link: "#women" },
  { name: "Contact", link: "#contact" },
];

const Navbar = ({ openAuth, openAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scroll
          ? "bg-white/90 backdrop-blur-md shadow-lg py-3"
          : "bg-black/20 backdrop-blur-md py-4 md:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#home"
          className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold tracking-[3px] sm:tracking-[5px] md:tracking-[8px] transition-all duration-300 ${
            scroll ? "text-black" : "text-white"
          }`}
        >
          SCENTASIA
        </a>

        {/* Desktop Menu */}
        <ul
          className={`hidden lg:flex items-center gap-8 xl:gap-10 text-[15px] uppercase tracking-widest transition-all duration-300 ${
            scroll ? "text-black" : "text-white"
          }`}
        >
          {navLinks.map((item) => (
            <li
              key={item.name}
              className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#C9A96E] after:transition-all after:duration-300 hover:after:w-full"
            >
              <a
                href={item.link}
                className="hover:text-[#C9A96E] duration-300"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Icons */}
        <div
          className={`hidden lg:flex items-center gap-4 xl:gap-5 text-lg xl:text-xl transition-all duration-300 ${
            scroll ? "text-black" : "text-white"
          }`}
        >
          <Link to="/wishlist">
            <FaHeart className="cursor-pointer hover:text-[#C9A96E] hover:scale-110 duration-300" />
          </Link>

          <Link to="/cart">
            <FaShoppingBag className="cursor-pointer hover:text-[#C9A96E] hover:scale-110 duration-300" />
          </Link>

          <FaUser
            onClick={openAuth}
            className="cursor-pointer hover:text-[#C9A96E] hover:scale-110 duration-300"
          />

          <MdAdminPanelSettings
            onClick={openAdmin}
            className="text-2xl cursor-pointer hover:text-[#C9A96E] hover:scale-110 duration-300"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden text-xl sm:text-2xl transition-all duration-300 ${
            scroll ? "text-black" : "text-white"
          }`}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-xl">

          <ul className="flex flex-col items-center gap-5 py-6 uppercase tracking-wider font-medium text-sm">

            {navLinks.map((item) => (
              <li key={item.name}>
                <a
                  href={item.link}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#C9A96E] duration-300"
                >
                  {item.name}
                </a>
              </li>
            ))}

            <div className="flex gap-8 text-2xl pt-2 pb-2">

              <Link to="/wishlist">
                <FaHeart
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer hover:text-[#C9A96E]"
                />
              </Link>

              <Link to="/cart">
                <FaShoppingBag
                  onClick={() => setMenuOpen(false)}
                  className="cursor-pointer hover:text-[#C9A96E]"
                />
              </Link>

              <FaUser
                onClick={() => {
                  setMenuOpen(false);
                  openAuth();
                }}
                className="cursor-pointer hover:text-[#C9A96E]"
              />

              <MdAdminPanelSettings
                onClick={() => {
                  setMenuOpen(false);
                  openAdmin();
                }}
                className="cursor-pointer hover:text-[#C9A96E]"
              />

            </div>

          </ul>

        </div>
      )}
    </nav>
  );
};

export default Navbar;