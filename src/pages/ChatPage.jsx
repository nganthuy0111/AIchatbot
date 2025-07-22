import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

const ChatPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I help you with education law today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post("/questions", {
        question_content: input,
        account_id: user?.token ? user.token : null, // Nếu không có token thì gửi null
      });
      if (res.status === 201) {
        setMessages((msgs) => [
          ...msgs,
          {
            sender: "bot",
            text: "Your question has been sent! Please wait for the answer.",
          },
        ]);
      } else {
        setMessages((msgs) => [
          ...msgs,
          {
            sender: "bot",
            text: "Sorry, there was a problem sending your question.",
          },
        ]);
      }
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "bot",
          text: "Error: Unable to send question. Please try again later.",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div
          className="w-full max-w-xl bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col"
          style={{ minHeight: 400 }}
        >
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
                    msg.sender === "user"
                      ? "bg-green-400 text-black"
                      : "bg-gray-800 text-green-300 border border-green-500"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <form className="flex" onSubmit={handleSend}>
            <input
              type="text"
              className="flex-1 rounded-l-md px-4 py-2 bg-gray-800 text-white focus:outline-none"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-green-400 text-black px-6 py-2 rounded-r-md font-semibold hover:bg-green-500 transition-colors"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChatPage;
