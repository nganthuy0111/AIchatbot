import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-black text-white text-center py-20 px-6">
      <div className="inline-block bg-green-900 bg-opacity-50 text-green-300 py-1 px-3 rounded-full text-sm font-semibold mb-4 border border-green-500">
        All-in-One Finance Toolkit
      </div>
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        Take control of your <br /> finances — with clarity
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
        All your money insights, finally in one place — track income, spending,
        and reach your goals with ease.
      </p>
      <Link
        to="/login"
        className="bg-green-400 text-black py-3 px-6 rounded-md font-semibold text-lg hover:bg-green-500 transition-colors shadow-lg shadow-green-400/20 inline-block"
      >
        Get Started Now! &rarr;
      </Link>
    </div>
  );
};

export default Hero;
