import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
};

export default HomePage;
