import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import GeminiFloatingChatBubble from "../components/GeminiFloatingChatBubble";

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
      </main>
      <Footer />
      <GeminiFloatingChatBubble />
    </div>
  );
};

export default HomePage;
