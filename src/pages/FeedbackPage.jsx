import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const FeedbackPage = () => {
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
      const user_id = user?.account_id || localStorage.getItem("account_id") || null;
      if (!user_id) {
        toast.error("You need to log in to send feedback.");
        setLoading(false);
        return;
      }
      const res = await axios.post("/feedbacks", {
        user_id,
        content,
      });
      if (res.status === 201) {
        toast.success("Feedback sent successfully! Thank you for your contribution.");
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
    <div className="bg-black min-h-screen flex flex-col text-white">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-gray-900 rounded-xl shadow-lg p-8 w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-green-400 text-center">Feedback & Suggestions</h1>
          <form onSubmit={handleSubmit}>
            <label className="block text-gray-300 mb-2" htmlFor="feedback-content">
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
      </main>
      <Footer />
    </div>
  );
};

export default FeedbackPage; 