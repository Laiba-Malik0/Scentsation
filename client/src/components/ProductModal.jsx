import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaShoppingBag, FaStar } from "react-icons/fa";

const ProductModal = ({ product, onClose, openAuth }) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    const handleAddToCart = () => {
        const user = localStorage.getItem("user");

        if (!user) {
            openAuth();
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({
            ...product,
            quantity,
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${quantity} Product Added To Cart 🛒`);
        onClose();
    };

    const handleBuyNow = () => {
        const user = localStorage.getItem("user");

        if (!user) {
            openAuth();
            return;
        }

        localStorage.setItem(
            "cart",
            JSON.stringify([
                {
                    ...product,
                    quantity,
                },
            ])
        );

        onClose();

        navigate("/cart");

        setTimeout(() => {
            document
                .querySelector(".StripeElement")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
        }, 500);
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                data-aos="zoom-in"
                className="relative w-full max-w-xl md:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-red-500 hover:text-white duration-300"
                >
                    <FaTimes />
                </button>

                {/* Image */}
                <div className="overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 md:h-full object-cover" />
                </div>

                {/* Details */}
                <div className="p-5 md:p-6 flex flex-col justify-center">
                    <p className="uppercase tracking-[4px] text-[#C9A96E] text-xs">
                        {product.brand}
                    </p>

                    <h2 className="text-2xl font-serif mt-2 break-words">
                        {product.name}
                    </h2>

                    <div className="flex gap-1 text-[#C9A96E] mt-3 text-sm">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>

                    <h3 className="text-2xl font-serif text-[#C9A96E] mt-4">
                        Rs {product.price}
                    </h3>

                    <p className="text-gray-600 text-sm leading-6 mt-4">
                        {product.description}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-4 mt-6">
                        <button
                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                            className="w-10 h-10 rounded-full border hover:bg-black hover:text-white duration-300"
                        >
                            -
                        </button>

                        <span className="text-xl font-semibold">
                            {quantity}
                        </span>

                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-10 h-10 rounded-full border hover:bg-black hover:text-white duration-300"
                        >
                            +
                        </button>
                    </div>

                    {/* Buttons */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-black text-white py-3 px-4 rounded-xl hover:bg-[#C9A96E] duration-300 flex items-center justify-center gap-2 text-sm"            >
                            <FaShoppingBag />
                            Add To Cart
                        </button>

                        <button
                            onClick={handleBuyNow}
                            className="w-full border border-black py-3 px-4 rounded-xl hover:bg-black hover:text-white duration-300 text-sm"            >
                            Buy Now
                        </button>

                        <button
                            onClick={onClose}
                            className="w-full border border-gray-300 py-3 px-4 rounded-xl hover:bg-gray-100 duration-300 text-sm"            >
                            ← Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;