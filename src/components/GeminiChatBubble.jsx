import React, { useState, useRef, useEffect } from "react";

const mockGeminiReply = async (message) => {
  // TODO: Replace with real Gemini API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Gemini reply to: "${message}"`);
    }, 900);
  });
};

const GeminiChatBubble = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I am Gemini. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    // Mock Gemini API
    const botReply = await mockGeminiReply(input);
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
    <div
      className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg mb-6 p-4 flex flex-col"
      style={{ minHeight: 320 }}
    >
      <div
        className="flex-1 overflow-y-auto space-y-3 mb-2"
        style={{ maxHeight: 320 }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`rounded-2xl px-4 py-2 max-w-[70%] break-words shadow
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
      <form
        className="flex items-center gap-2 mt-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <textarea
          className="flex-1 rounded-2xl border border-gray-300 px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white min-h-[44px] max-h-32"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInputKeyDown}
          disabled={loading}
          rows={1}
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-2xl shadow disabled:opacity-60"
          disabled={loading || !input.trim()}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default GeminiChatBubble;
