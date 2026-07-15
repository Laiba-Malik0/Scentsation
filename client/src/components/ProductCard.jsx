import { FaHeart, FaShoppingBag, FaStar } from "react-icons/fa";

const ProductCard = ({
  product,
  openAuth,
  openProduct,
}) => {

  const handleWishlist = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      openAuth();
      return;
    }

    let wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExist = wishlist.find(
      (item) => item._id === product._id
    );

    if (alreadyExist) {
      alert("Already in Wishlist ❤️");
      return;
    }

    wishlist.push(product);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );

    alert("Added To Wishlist ❤️");
  };

  const handleAddToCart = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      openAuth();
      return;
    }

    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const alreadyExist = cart.find(
      (item) => item._id === product._id
    );

    if (alreadyExist) {
      alert("Already in Cart 🛒");
      return;
    }

    cart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Added To Cart 🛒");
  };

  return (
    <div className="group w-full max-w-[270px] mx-auto bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">

      {/* Image */}
      <div className="relative overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="h-52 sm:h-56 w-full object-cover group-hover:scale-110 duration-500"
        />

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-[#C9A96E] hover:text-white duration-300"
        >
          <FaHeart />
        </button>

        <span className="absolute top-3 left-3 bg-[#C9A96E] text-white text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase">
          {product.gender}
        </span>

      </div>

      {/* Details */}
      <div className="p-5">

        <p className="uppercase tracking-[3px] text-[10px] sm:text-xs text-gray-500">
          {product.brand}
        </p>

        <h3 className="text-xl sm:text-2xl font-serif mt-2 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex gap-1 text-[#C9A96E] text-sm mt-3">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>

        <h4 className="text-2xl sm:text-3xl text-[#C9A96E] font-serif mt-4">
          Rs {product.price}
        </h4>

        {/* Buttons */}
        <div className="flex gap-3 mt-5">

          <button
            onClick={() => openProduct(product)}
            className="flex-1 border border-black py-2.5 rounded-full text-sm sm:text-base hover:bg-black hover:text-white duration-300"
          >
            Read More
          </button>

          <button
            onClick={handleAddToCart}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#C9A96E] duration-300"
          >
            <FaShoppingBag />
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;