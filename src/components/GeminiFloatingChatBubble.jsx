import React, { useState, useRef, useEffect } from "react";
import { getGeminiReply } from "../api/gemini";

const GeminiFloatingChatBubble = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I am Gemini. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    // Gọi Gemini API thật
    const botReply = await getGeminiReply(input);
    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    setLoading(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          className="fixed bottom-28 right-6 z-50 w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg flex items-center justify-center text-white text-3xl focus:outline-none"
          onClick={() => setOpen(true)}
          aria-label="Open Gemini Chat"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 22c5.523 0 10-4.03 10-9s-4.477-9-10-9S2 8.03 2 13c0 1.61.49 3.13 1.4 4.45l-1.32 3.3a1 1 0 0 0 1.27 1.32l3.3-1.32A9.98 9.98 0 0 0 12 22Z"
            />
          </svg>
        </button>
      )}
      {/* Floating chat window */}
      {open && (
        <div className="fixed bottom-28 right-6 z-50 w-[350px] max-w-[95vw] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-purple-300">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-purple-700 rounded-t-2xl text-white">
            <span className="font-bold">Gemini Chat</span>
            <button
              onClick={() => setOpen(false)}
              className="text-xl hover:text-purple-200"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 bg-purple-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[80%] break-words shadow
                    ${
                      msg.sender === "user"
                        ? "bg-blue-200 text-blue-900"
                        : "bg-purple-200 text-purple-900"
                    }
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Input */}
          <form
            className="flex items-center gap-2 px-3 py-3 border-t border-purple-200 bg-white rounded-b-2xl"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <textarea
              className="flex-1 rounded-2xl border border-gray-300 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white min-h-[38px] max-h-24"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              disabled={loading}
              rows={1}
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-2xl shadow disabled:opacity-60"
              disabled={loading || !input.trim()}
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default GeminiFloatingChatBubble;
