import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaPlusCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import AddProduct from "../components/AddProduct";
import ProductList from "../components/ProductList";
import Orders from "../components/Orders";

const Admin = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("add");
  const [editProduct, setEditProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("admin");

    if (isLoggedIn !== "true") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    alert("Logged Out Successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] flex relative">

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white text-black p-3 rounded-xl shadow-xl border"
      >
        {menuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
      </button>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:sticky top-0 left-0
          w-64 h-screen
          bg-black text-white p-6
          transform transition-transform duration-300 z-40
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >

        <h2 className="text-3xl font-serif mb-10">
          SCENTASIA
        </h2>

        <button
          onClick={() => {
            setEditProduct(null);
            setActiveTab("add");
            setMenuOpen(false);
          }}
          className={`w-full flex items-center gap-3 p-4 rounded-xl mb-4 ${
            activeTab === "add"
              ? "bg-[#C9A96E]"
              : "hover:bg-gray-800"
          }`}
        >
          <FaPlusCircle />
          Add Product
        </button>

        <button
          onClick={() => {
            setActiveTab("products");
            setMenuOpen(false);
          }}
          className={`w-full flex items-center gap-3 p-4 rounded-xl mb-4 ${
            activeTab === "products"
              ? "bg-[#C9A96E]"
              : "hover:bg-gray-800"
          }`}
        >
          <FaBoxOpen />
          All Products
        </button>

        <button
          onClick={() => {
            setActiveTab("orders");
            setMenuOpen(false);
          }}
          className={`w-full flex items-center gap-3 p-4 rounded-xl mb-4 ${
            activeTab === "orders"
              ? "bg-[#C9A96E]"
              : "hover:bg-gray-800"
          }`}
        >
          📦 Orders
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-red-500 duration-300"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

      {/* Content */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 pt-24 lg:pt-8 pb-8 overflow-x-auto">

        {activeTab === "add" && (
          <AddProduct
            editProduct={editProduct}
            clearEdit={() => setEditProduct(null)}
          />
        )}

        {activeTab === "products" && (
          <ProductList
            onEdit={(product) => {
              setEditProduct(product);
              setActiveTab("add");
            }}
          />
        )}

        {activeTab === "orders" && <Orders />}

      </div>

    </div>
  );
};

export default Admin;