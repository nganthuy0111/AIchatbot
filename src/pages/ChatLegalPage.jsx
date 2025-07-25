import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import { apiChatbotLawClient } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BOT_NAME = "LegalBot";

const ChatLegalPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am LegalBot. How can I assist you with legal matters?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setError("");
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [
      ...prev,
      userMsg,
      { sender: "bot", text: "...", loading: true },
    ]);
    setInput("");
    setLoading(true);
    try {
      // 1. Gửi câu hỏi
      const res = await apiChatbotLawClient.post(
        `/Question?userId=${user?.account_id || ""}`,
        input,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // 2. Lấy questionId từ response
      const questionId =
        res.data?.questionId || res.data?.questionID || res.data?.id;
      if (!questionId) {
        setMessages((prev) => {
          const msgs = [...prev];
          // Xóa loading
          if (msgs.length > 0 && msgs[msgs.length - 1].loading) msgs.pop();
          return [
            ...msgs,
            {
              sender: "bot",
              text: "Sorry, could not get the question ID from server.",
            },
          ];
        });
        setLoading(false);
        return;
      }
      // 3. Gọi API lấy câu trả lời
      const answerRes = await apiChatbotLawClient.get(
        `/Answer?questionId=${questionId}`
      );
      let answerText = "No answer found.";
      if (answerRes.data && answerRes.data.ansContent) {
        answerText = answerRes.data.ansContent;
      }
      setMessages((prev) => {
        const msgs = [...prev];
        // Xóa loading
        if (msgs.length > 0 && msgs[msgs.length - 1].loading) msgs.pop();
        return [...msgs, { sender: "bot", text: answerText }];
      });
    } catch (err) {
      setMessages((prev) => {
        const msgs = [...prev];
        if (msgs.length > 0 && msgs[msgs.length - 1].loading) msgs.pop();
        return [
          ...msgs,
          {
            sender: "bot",
            text: "Sorry, there was an error processing your question.",
          },
        ];
      });
      setError("API error: " + (err?.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const fetchHistory = async () => {
    if (!user?.account_id) return;
    setLoadingHistory(true);
    setShowHistory(true);
    try {
      const res = await apiChatbotLawClient.get(
        `/Question/daily-history/${user.account_id}`
      );
      setHistory(Array.isArray(res.data) ? res.data : []);
    } catch {
      setHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-8">
        <div className="w-full max-w-2xl flex flex-col h-[80vh] bg-[#18191A] rounded-2xl shadow-2xl p-6 md:p-10 relative">
          {/* Back to home icon */}
          <button
            className="absolute top-4 left-4 text-white hover:text-green-400 transition-colors text-2xl"
            title="Back to Home"
            type="button"
            onClick={() => navigate("/")}
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* Chat history icon */}
          <button
            className="absolute top-4 right-4 text-[#4ae168] hover:text-green-400 transition-colors text-2xl"
            title="Chat history"
            type="button"
            onClick={fetchHistory}
          >
            <FaRegClock />
          </button>
          {/* Popup chat history */}
          {showHistory && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
              onClick={() => setShowHistory(false)}
            >
              <div
                className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                  onClick={() => setShowHistory(false)}
                >
                  ✕
                </button>
                <h2 className="text-lg font-bold mb-4 text-black">
                  Chat History
                </h2>
                {loadingHistory ? (
                  <div className="text-gray-700">Loading...</div>
                ) : history.length === 0 ? (
                  <div className="text-gray-500">No history found.</div>
                ) : (
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {history.map((item, idx) => (
                      <div key={idx}>
                        {/* User question */}
                        <div className="flex justify-end mb-1">
                          <span className="bg-blue-400 text-black rounded-2xl rounded-br-none px-3 py-2 text-sm font-medium shadow-md max-w-[80%] break-words">
                            {item.questionContent ||
                              item.question ||
                              "(No content)"}
                          </span>
                        </div>
                        {/* Bot answer */}
                        {item.answerContent && (
                          <div className="flex justify-start">
                            <span className="bg-[#4ae168] text-black rounded-2xl rounded-bl-none px-3 py-2 text-sm font-medium shadow-md max-w-[80%] break-words">
                              {item.answerContent}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex-1 flex flex-col h-0">
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col justify-center mb-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`mb-4 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] flex flex-col items-${
                      msg.sender === "user" ? "end" : "start"
                    }`}
                  >
                    <span
                      className={`px-3 py-2 rounded-2xl text-sm font-medium shadow-md leading-normal break-words
                        ${
                          msg.sender === "user"
                            ? "bg-blue-400 text-black rounded-br-none"
                            : "bg-[#4ae168] text-black rounded-bl-none"
                        }
                        ${msg.loading ? "animate-pulse" : ""}`}
                    >
                      {msg.text}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
              {error && (
                <div className="text-red-400 text-sm mt-2">{error}</div>
              )}
            </div>
            <form
              className="flex pt-2 border-t border-[#23272F] bg-[#23272F] sticky bottom-0 z-10"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                className="flex-1 rounded-full px-4 py-2 bg-[#40414F] text-white focus:outline-none text-sm border-none shadow-inner placeholder-gray-400"
                placeholder="Type your legal question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
                disabled={loading}
                autoFocus
              />
              <button
                type="submit"
                className="bg-blue-400 text-black px-8 py-4 rounded-full font-semibold text-base ml-3 hover:bg-blue-500 transition-colors disabled:bg-gray-500 shadow-md"
                disabled={loading || !input.trim()}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatLegalPage;
