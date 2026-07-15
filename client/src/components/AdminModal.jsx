import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import api from "../services/api";

const AdminModal = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/admin/login", {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("admin", "true");
        alert("Admin Login Successful ✅");
        onClose();
        onSuccess();
      }
    } catch (err) {
      alert(
        err.response?.data?.message || "Invalid Admin Credentials"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-md">

      <div className="relative w-[90%] max-w-md bg-white rounded-3xl shadow-2xl p-8">

        <button
          onClick={onClose}
          className="absolute right-5 top-5"
        >
          <FaTimes />
        </button>

        <h2 className="text-4xl font-serif text-center mb-8">
          Admin Login
        </h2>

        <form
          onSubmit={handleLogin}
          autoComplete="off"
          className="space-y-4"
        >

          <input
            type="email"
            name="admin_email"
            autoComplete="off"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-xl p-3 outline-none focus:border-[#C9A96E]"
          />

          <input
            type="password"
            name="admin_password"
            autoComplete="new-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-xl p-3 outline-none focus:border-[#C9A96E]"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-[#C9A96E] duration-300"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminModal;