import React from "react";
import logo from "../assets/logoEduLawAI.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");
    } catch (err) {
      // Optionally handle error
    }
    logout();
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
        <Link to="/pricing" className="hover:text-gray-300">
          Pricing
        </Link>
        <Link to="/blog" className="hover:text-gray-300">
          Blog
        </Link>
      </nav>

      {user ? (
        <div className="flex items-center space-x-4">
          {/* You can add authenticated user links here */}
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
