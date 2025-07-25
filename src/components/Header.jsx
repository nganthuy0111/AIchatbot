import React from "react";
import logo from "../assets/logoEduLawAI.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import apiClient from "../api/axios";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [headerAvatar, setHeaderAvatar] = React.useState("");

  React.useEffect(() => {
    const fetchHeaderAvatar = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await apiClient.get("/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHeaderAvatar(res.data.avatar || "");
      } catch {
        setHeaderAvatar("");
      }
    };
    fetchHeaderAvatar();
  }, []);

  const handleNav = (section) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleLogout = async () => {
    await logout(); // chỉ gọi logout từ context
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 bg-black text-white shadow">
      <span
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="Logo" className="w-8 h-8 mr-2 object-contain" />
        <span className="text-xl font-bold">ELA</span>
      </span>

      <nav className="flex items-center space-x-6">
        <button
          onClick={() => handleNav("home")}
          className="hover:text-gray-300 bg-transparent border-none outline-none cursor-pointer"
        >
          Home
        </button>
        <button
          onClick={() => handleNav("about")}
          className="hover:text-gray-300 bg-transparent border-none outline-none cursor-pointer"
        >
          About
        </button>
        <button
          onClick={() => handleNav("feedback")}
          className="hover:text-gray-300 bg-transparent border-none outline-none cursor-pointer"
        >
          Feedback
        </button>
        <Link to="/chat-legal" className="hover:text-gray-300">
          Chat AI
        </Link>
        {user && user.role === "admin" && (
          <Link to="/management" className="hover:text-gray-300">
            Management
          </Link>
        )}
      </nav>

      {user ? (
        <div className="flex items-center space-x-4">
          {/* Avatar user chuyển sang trang profile */}
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-green-400 transition-colors overflow-hidden"
            title="Profile"
            onClick={() => navigate("/profile")}
          >
            <img
              src={headerAvatar || "https://i.pravatar.cc/100"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
          <button
            onClick={handleLogout}
            className="bg-green-400 text-black py-2 px-4 rounded-md font-semibold hover:bg-green-500 transition-colors"
          >
            Log Out
          </button>
        </div>
      ) : null}

      <button className="md:hidden">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
    </header>
  );
};

export default Header;
