import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

// Giả lập lịch sử chat (bạn có thể thay bằng API sau)
const mockChatHistory = [
  {
    chat_id: "1753184828242-lyxs99qz",
    title: "Luật giáo dục Việt Nam",
    lastMessage: "Tôi không tìm thấy điều khoản phù hợp trong hệ thống.",
    time: "2025-07-22 11:47",
  },
  {
    chat_id: "1753184662654-r2j4zm9n",
    title: "Hỏi về quyền học sinh",
    lastMessage: "Đã nhận được câu trả lời.",
    time: "2025-07-22 11:44",
  },
];

const ChatPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I help you with education law today?",
      time: new Date().toLocaleString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(mockChatHistory[0].chat_id);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const now = new Date();
    setMessages((msgs) => [...msgs, { sender: "user", text: input, time: now.toLocaleString() }]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post("/questions", {
        question_content: input,
        account_id: user?.account_id || localStorage.getItem("account_id") || null,
      });
      if (res.status === 201) {
        const answerContent = res.data?.answer?.answer_content;
        if (answerContent) {
          setMessages((msgs) => [
            ...msgs,
            { sender: "bot", text: answerContent, time: new Date().toLocaleString() },
          ]);
        } else {
          const answerId = res.data?.answer?.answer_id;
          if (answerId) {
            try {
              const answerRes = await axios.get(`/answers/${answerId}`);
              const answerContentApi = answerRes.data?.answer_content || "Đã nhận được câu trả lời.";
              setMessages((msgs) => [
                ...msgs,
                { sender: "bot", text: answerContentApi, time: new Date().toLocaleString() },
              ]);
            } catch (err) {
              setMessages((msgs) => [
                ...msgs,
                { sender: "bot", text: "Đã gửi câu hỏi, nhưng không lấy được chi tiết câu trả lời.", time: new Date().toLocaleString() },
              ]);
            }
          } else {
            setMessages((msgs) => [
              ...msgs,
              { sender: "bot", text: "Your question has been sent! Please wait for the answer.", time: new Date().toLocaleString() },
            ]);
          }
        }
      } else {
        setMessages((msgs) => [
          ...msgs,
          { sender: "bot", text: "Sorry, there was a problem sending your question.", time: new Date().toLocaleString() },
        ]);
      }
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "Error: Unable to send question. Please try again later.", time: new Date().toLocaleString() },
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-row bg-gray-950">
        {/* Sidebar lịch sử chat */}
        <aside className="w-72 bg-[#18191A] border-r border-[#23272F] flex flex-col py-4 px-2 shadow-lg">
          <h2 className="text-lg font-bold text-white mb-4 px-2">Chats</h2>
          <div className="flex-1 overflow-y-auto pr-1">
            {mockChatHistory.map((chat) => (
              <div
                key={chat.chat_id}
                className={`group flex items-center gap-3 mb-2 px-3 py-2 rounded-lg cursor-pointer transition-all border border-transparent select-none ${
                  selectedChat === chat.chat_id
                    ? "bg-[#343541] text-white border-[#4ae168] shadow-md"
                    : "hover:bg-[#2A2B32] text-gray-200 hover:text-white hover:border-[#4ae168]"
                }`}
                onClick={() => setSelectedChat(chat.chat_id)}
              >
                {/* Avatar tròn với chữ cái đầu */}
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#4ae168] text-black font-bold text-base shadow">
                  {chat.title.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate text-base">
                    {chat.title}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {chat.lastMessage}
                  </div>
                </div>
                <div className="text-xs text-gray-500 ml-2 min-w-fit">
                  {chat.time}
                </div>
                {/* Dấu ba chấm */}
                <div className="ml-2 text-gray-400 group-hover:text-[#4ae168]">
                  ...
                </div>
              </div>
            ))}
          </div>
        </aside>
        {/* Main chat window */}
        <section className="flex-1 flex flex-col items-center justify-center px-0 py-8 bg-[#18191A]">
          <div
            className="w-full max-w-3xl bg-[#23272F] rounded-2xl shadow-2xl p-10 flex flex-col h-[80vh] ml-10 mr-10"
          >
            <div className="flex-1 flex flex-col h-0">
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col justify-center mb-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-4 flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className={`max-w-[70%] flex flex-col items-${msg.sender === "user" ? "end" : "start"}`}>
                      <span
                        className={`px-3 py-2 rounded-2xl text-sm font-medium shadow-md leading-normal break-words ${
                          msg.sender === "user"
                            ? "bg-[#4ae168] text-black rounded-br-none"
                            : "bg-[#444654] text-white border border-[#4ae168] rounded-bl-none"
                        }`}
                      >
                        {msg.text}
                      </span>
                      <div className="text-xs text-gray-400 mt-1">
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <form className="flex pt-2 border-t border-[#23272F] bg-[#23272F] sticky bottom-0 z-10" onSubmit={handleSend}>
                <input
                  type="text"
                  className="flex-1 rounded-full px-4 py-2 bg-[#40414F] text-white focus:outline-none text-sm border-none shadow-inner placeholder-gray-400"
                  placeholder="Ask anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-[#4ae168] text-black px-8 py-4 rounded-full font-semibold text-base ml-3 hover:bg-[#6cf08a] transition-colors disabled:bg-gray-500 shadow-md"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChatPage;
