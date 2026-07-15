import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import api from "../services/api";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Part 2 me isme backend logic ayega
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      await api.post("/users/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration Successful 🎉");

      setIsLogin(true);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      return;
    }

    const { data } = await api.post("/users/login", {
      email: formData.email,
      password: formData.password,
    });

   localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));

alert("Login Successful ✅");

window.location.reload();

  } catch (error) {
    alert(error.response?.data?.message || "Something went wrong");
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className="relative w-[90%] max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-[fadeIn_.3s_ease]">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500 hover:text-black"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-4xl font-serif text-center mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="text-center text-gray-500 mb-8">
          {isLogin
            ? "Login to continue shopping"
            : "Join SCENTASIA today"}
        </p>

        <form onSubmit={handleSubmit} 
        autoComplete="off"
        className="space-y-4">

          {!isLogin && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full border rounded-xl p-3 outline-none focus:border-[#C9A96E]"
            />
          )}

          <input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Email"
  autoComplete="off"
  spellCheck={false}
  className="w-full border rounded-xl p-3 outline-none focus:border-[#C9A96E]"
/>

         <input
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  placeholder="Password"
  autoComplete="new-password"
  className="w-full border rounded-xl p-3 outline-none focus:border-[#C9A96E]"
/>
          {!isLogin && (
           <input
  type="password"
  name="confirmPassword"
  value={formData.confirmPassword}
  onChange={handleChange}
  placeholder="Confirm Password"
  autoComplete="new-password"
  className="w-full border rounded-xl p-3 outline-none focus:border-[#C9A96E]"
/>
          )}

          <button
            type="submit"
            className="w-full bg-black hover:bg-[#C9A96E] duration-300 text-white py-3 rounded-xl"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-[#C9A96E] font-semibold"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

      </div>
    </div>
  );
};

export default AuthModal;