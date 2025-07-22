import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-6 px-4 text-center border-t border-gray-800">
      <div className="max-w-4xl mx-auto flex items-center justify-center">
        <span className="text-sm">
          &copy; {new Date().getFullYear()} School Law AI Chatbot. All rights
          reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
