import React from "react";
import logo from "../assets/logoEduLawAI.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(); // chỉ gọi logout từ context
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center p-6 bg-black text-white">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="w-8 h-8 mr-2 object-contain" />
        <span className="text-xl font-bold">ELA</span>
      </Link>

      <nav className="flex items-center space-x-6">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/about" className="hover:text-gray-300">
          About
        </Link>
        <Link to="/feedback" className="hover:text-gray-300">
          Feedback
        </Link>
        {user && user.role === "admin" && (
          <Link to="/management" className="hover:text-gray-300">
            Management
          </Link>
        )}
      </nav>

      {user ? (
        <div className="flex items-center space-x-4">
          {/* Icon user chuyển sang trang profile */}
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-green-400 transition-colors"
            title="Profile"
            onClick={() => navigate("/profile")}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
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
