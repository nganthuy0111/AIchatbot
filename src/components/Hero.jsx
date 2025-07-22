import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleChatBubbleClick = () => {
    navigate("/chat");
  };

  return (
    <div className="bg-black text-white text-center py-20 px-6">
      <div className="inline-block bg-green-900 bg-opacity-50 text-green-300 py-1 px-3 rounded-full text-sm font-semibold mb-4 border border-green-500">
        AI Chatbot for Education Law Consulting
      </div>
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        Your AI Assistant for <br /> Vietnam Education Law
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
        Ask questions about regulations, procedures, rights, and obligations in
        the field of education. The chatbot provides accurate, fast, and
        easy-to-understand information to help you solve legal issues in
        education effectively.
      </p>
      <Link
        to="/login"
        className="bg-green-400 text-black py-3 px-6 rounded-md font-semibold text-lg hover:bg-green-500 transition-colors shadow-lg shadow-green-400/20 inline-block"
      >
        Start Now &rarr;
      </Link>
      {/* Floating chat bubble button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-green-400 text-black rounded-full shadow-lg p-4 flex items-center justify-center hover:bg-green-500 transition-colors"
        aria-label="Chat with AI"
        style={{ boxShadow: "0 4px 16px rgba(34,197,94,0.3)" }}
        onClick={handleChatBubbleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4 1 1-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Hero;
