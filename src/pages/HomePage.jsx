import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import GeminiFloatingChatBubble from "../components/GeminiFloatingChatBubble";

// About section (rút gọn từ AboutPage)
const AboutSection = () => (
  <section id="about" className="max-w-2xl mx-auto py-16 px-6">
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
      <h2 className="text-2xl font-bold text-green-400 mb-2">Key Features</h2>
      <ul className="list-disc list-inside text-gray-300">
        <li>24/7 instant legal advice for school-related issues</li>
        <li>Easy-to-understand explanations of Vietnamese education law</li>
        <li>Support for students, parents, and teachers</li>
        <li>Secure and private conversations</li>
        <li>Completely free to use</li>
      </ul>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-green-400 mb-2">How It Works</h2>
      <p className="text-gray-300">
        Simply type your question in the chat and our AI will provide a clear,
        accurate answer based on the latest school law regulations in Vietnam.
        Whether you need help with student rights, school policies, or legal
        procedures, our chatbot is here to assist you.
      </p>
    </div>
  </section>
);

// Feedback section (rút gọn từ FeedbackPage)
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";
import { toast } from "react-toastify";
import ReactFeedback, { useState } from "react";
const FeedbackSection = () => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Please enter your feedback!");
      return;
    }
    setLoading(true);
    try {
      const user_id =
        user?.account_id || localStorage.getItem("account_id") || null;
      if (!user_id) {
        toast.error("You need to log in to send feedback.");
        setLoading(false);
        return;
      }
      const res = await axios.post("/feedbacks", { user_id, content });
      if (res.status === 201) {
        toast.success(
          "Feedback sent successfully! Thank you for your contribution."
        );
        setContent("");
      } else {
        toast.error("Failed to send feedback. Please try again.");
      }
    } catch {
      toast.error("An error occurred. Please try again later.");
    }
    setLoading(false);
  };
  return (
    <section
      id="feedback"
      className="flex flex-col items-center justify-center px-4 py-12"
    >
      <div className="bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-green-400 text-center">
          Feedback & Suggestions
        </h1>
        <form onSubmit={handleSubmit}>
          <label
            className="block text-gray-300 mb-2"
            htmlFor="feedback-content"
          >
            Your Feedback
          </label>
          <textarea
            id="feedback-content"
            className="w-full h-32 p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-green-500 text-white mb-4 resize-none"
            placeholder="Enter your comments, suggestions, or feedback..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-black py-2 rounded-md font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-500"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Feedback"}
          </button>
        </form>
      </div>
    </section>
  );
};

// News section mock
const newsList = [
  {
    id: 1,
    title: "Bộ GD&ĐT ban hành Thông tư mới về đánh giá học sinh tiểu học",
    date: "20/07/2025",
    summary:
      "Thông tư quy định rõ hơn về phương pháp đánh giá, nhận xét học sinh tiểu học, chú trọng phát triển năng lực và phẩm chất.",
  },
  {
    id: 2,
    title: "Chính sách miễn giảm học phí cho học sinh phổ thông năm 2025",
    date: "15/07/2025",
    summary:
      "Năm học 2025, nhiều đối tượng học sinh sẽ được miễn, giảm học phí theo nghị định mới của Chính phủ.",
  },
  {
    id: 3,
    title:
      "Tăng cường kiểm tra chất lượng giáo dục tại các trường ngoài công lập",
    date: "10/07/2025",
    summary:
      "Bộ GD&ĐT yêu cầu các địa phương tăng cường thanh tra, kiểm tra chất lượng giáo dục tại các trường tư thục, đảm bảo quyền lợi học sinh.",
  },
  {
    id: 4,
    title: "Hội thảo về đổi mới chương trình giáo dục phổ thông",
    date: "05/07/2025",
    summary:
      "Các chuyên gia, nhà quản lý giáo dục đã thảo luận về những điểm mới trong chương trình giáo dục phổ thông và định hướng triển khai trong thời gian tới.",
  },
];

const NewsSection = () => (
  <section id="news" className="max-w-3xl mx-auto py-12 px-6">
    <h2 className="text-3xl font-bold mb-6 text-green-400">
      Tin tức Luật Giáo Dục
    </h2>
    <div className="space-y-6">
      {newsList.map((news) => (
        <div
          key={news.id}
          className="bg-gray-900 rounded-xl shadow p-6 border-l-4 border-green-400"
        >
          <div className="flex items-center mb-2">
            <span className="text-green-300 font-semibold mr-4">
              {news.date}
            </span>
            <span className="text-lg font-bold text-white">{news.title}</span>
          </div>
          <p className="text-gray-300">{news.summary}</p>
        </div>
      ))}
    </div>
  </section>
);

const HomePage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24">
        <section id="home">
          <Hero />
        </section>
        <AboutSection />
        <NewsSection />
        <FeedbackSection />
      </main>
      <Footer />
      <GeminiFloatingChatBubble />
    </div>
  );
};

export default HomePage;
