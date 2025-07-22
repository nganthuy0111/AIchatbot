import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <Header />
      <main className="max-w-2xl mx-auto py-16 px-6 flex-1">
        <h1 className="text-4xl font-bold mb-6 text-green-400">
          About School Law AI Chatbot
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          <span className="font-semibold text-green-300">
            School Law AI Chatbot
          </span>{" "}
          is an intelligent assistant designed to help students, parents, and
          educators understand and navigate school law in Vietnam. Our chatbot
          provides instant answers to questions about regulations, rights,
          responsibilities, and legal procedures in the education sector.
        </p>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-green-400 mb-2">
            Key Features
          </h2>
          <ul className="list-disc list-inside text-gray-300">
            <li>24/7 instant legal advice for school-related issues</li>
            <li>Easy-to-understand explanations of Vietnamese education law</li>
            <li>Support for students, parents, and teachers</li>
            <li>Secure and private conversations</li>
            <li>Completely free to use</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-2">
            How It Works
          </h2>
          <p className="text-gray-300">
            Simply type your question in the chat and our AI will provide a
            clear, accurate answer based on the latest school law regulations in
            Vietnam. Whether you need help with student rights, school policies,
            or legal procedures, our chatbot is here to assist you.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
