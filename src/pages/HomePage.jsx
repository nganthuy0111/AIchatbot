import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
