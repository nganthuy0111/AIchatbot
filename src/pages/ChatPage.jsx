import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

// Giả lập lịch sử chat (bạn có thể thay bằng API sau)
const initialChatRooms = [
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
  const [chatRooms, setChatRooms] = useState(initialChatRooms); // setChatRooms sẽ được dùng khi tạo phòng mới
  // selectedChat mặc định là null
  const [selectedChat, setSelectedChat] = useState(null);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [createRoomError, setCreateRoomError] = useState("");
  const [creatingRoom, setCreatingRoom] = useState(false);

  // Thay useEffect fetchChatRooms bằng logic chỉ gọi khi account_id thực sự thay đổi
  const [lastFetchedAccountId, setLastFetchedAccountId] = useState(null);
  useEffect(() => {
    const account_id =
      user?.account_id || localStorage.getItem("account_id") || null;
    if (!account_id || account_id === lastFetchedAccountId) return;
    const fetchChatRooms = async () => {
      try {
        const res = await axios.get("/chat-room/list", {
          params: { account_id },
        });
        if (res.status === 200 && Array.isArray(res.data)) {
          setChatRooms(
            res.data.map((room) => ({
              chat_id: room.chat_id, // ĐÚNG trường
              title: room.room_name,
              lastMessage: room.last_message || "",
              time: room.updatedAt || new Date().toLocaleString(),
            }))
          );
        }
        setLastFetchedAccountId(account_id);
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchChatRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.account_id]);

  // Lấy lịch sử chat mỗi khi chọn phòng chat mới
  useEffect(() => {
    if (!selectedChat) return;
    console.log("Fetching messages for chat_id:", selectedChat);
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/chat-room/${selectedChat}/messages`);
        console.log("Messages API response:", res);
        if (res.status === 200 && Array.isArray(res.data)) {
          // Map đúng trường dữ liệu từ API
          const msgs = [];
          res.data.forEach((item) => {
            if (item.question) {
              msgs.push({
                sender: "user",
                text: item.question,
                time: item.question_date || "",
              });
            }
            if (item.answer) {
              msgs.push({
                sender: "bot",
                text: item.answer,
                time: item.answer_date || "",
              });
            }
          });
          setMessages(
            msgs.length > 0
              ? msgs
              : [
                  {
                    sender: "bot",
                    text: "Hello! How can I help you with education law today?",
                    time: new Date().toLocaleString(),
                  },
                ]
          );
        }
      } catch (err) {
        console.log("Error fetching messages:", err);
        setMessages([
          {
            sender: "bot",
            text: "Unable to load chat history.",
            time: new Date().toLocaleString(),
          },
        ]);
      }
    };
    fetchMessages();
  }, [selectedChat]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const now = new Date();
    setMessages((msgs) => [
      ...msgs,
      { sender: "user", text: input, time: now.toLocaleString() },
    ]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post("/chat-room/message/send", {
        question_content: input,
        account_id:
          user?.account_id || localStorage.getItem("account_id") || null,
        chat_id: selectedChat,
      });
      if (res.status === 201 && res.data) {
        const answerContent =
          res.data.data?.answer?.answer_content ||
          "No answer received from the system.";
        setMessages((msgs) => [
          ...msgs,
          {
            sender: "bot",
            text: answerContent,
            time: new Date().toLocaleString(),
          },
        ]);
      } else {
        setMessages((msgs) => [
          ...msgs,
          {
            sender: "bot",
            text: "No answer received from the system.",
            time: new Date().toLocaleString(),
          },
        ]);
      }
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "bot",
          text: "Error sending question. Please try again.",
          time: new Date().toLocaleString(),
        },
      ]);
    }
    setLoading(false);
  };

  // Modal tạo phòng chat mới
  const CreateRoomModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#23272F] rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-4">
          Create New Chat Room
        </h3>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-md bg-[#40414F] text-white border-none focus:outline-none mb-3"
          placeholder="Enter chat room name..."
          value={newRoomName}
          onChange={(e) => {
            setNewRoomName(e.target.value);
            setCreateRoomError("");
          }}
          disabled={creatingRoom}
          autoFocus
        />
        {createRoomError && (
          <div className="text-red-400 text-sm mb-2">{createRoomError}</div>
        )}
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700"
            onClick={() => {
              setShowCreateRoomModal(false);
              setNewRoomName("");
              setCreateRoomError("");
            }}
            disabled={creatingRoom}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-[#4ae168] text-black font-semibold hover:bg-[#6cf08a] disabled:bg-gray-500"
            onClick={handleCreateRoom}
            disabled={creatingRoom}
          >
            {creatingRoom ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );

  // Xử lý tạo phòng chat mới
  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) {
      setCreateRoomError("Room name cannot be empty.");
      return;
    }
    setCreatingRoom(true);
    setCreateRoomError("");
    try {
      const account_id =
        user?.account_id || localStorage.getItem("account_id") || null;
      if (!account_id) {
        setCreateRoomError("You need to login to create a chat room.");
        setCreatingRoom(false);
        return;
      }
      const res = await axios.post("/chat-room/create", {
        account_id,
        room_name: newRoomName.trim(),
      });
      if (res.status === 201 && res.data) {
        // Gọi lại API lấy danh sách phòng chat mới nhất
        const listRes = await axios.get("/chat-room/list", {
          params: { account_id },
        });
        if (listRes.status === 200 && Array.isArray(listRes.data)) {
          // Sắp xếp phòng mới nhất lên đầu theo updatedAt
          const sortedRooms = [...listRes.data].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setChatRooms(
            sortedRooms.map((room) => ({
              chat_id: room.chat_id,
              title: room.room_name,
              lastMessage: room.last_message || "",
              time: room.updatedAt || new Date().toLocaleString(),
            }))
          );
          // Tìm chat_id của phòng vừa tạo (ưu tiên lấy từ response tạo phòng, fallback lấy phòng mới nhất)
          let newChatId = res.data.chat_id || res.data.room_id;
          if (!newChatId) {
            // Nếu API không trả về chat_id, lấy phòng mới nhất theo updatedAt
            const sorted = [...listRes.data].sort(
              (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
            );
            newChatId = sorted[0]?.chat_id;
          }
          if (newChatId) setSelectedChat(newChatId);
        }
        setShowCreateRoomModal(false);
        setNewRoomName("");
        setCreateRoomError("");
      } else {
        setCreateRoomError("Failed to create room. Please try again.");
      }
    } catch (err) {
      setCreateRoomError("An error occurred. Please try again.");
    }
    setCreatingRoom(false);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-row bg-gray-950">
        {/* Sidebar lịch sử chat */}
        <aside className="w-72 bg-[#18191A] border-r border-[#23272F] flex flex-col py-4 px-2 shadow-lg">
          <h2 className="text-lg font-bold text-white mb-4 px-2">
            Chat History
          </h2>
          {/* Nút tạo phòng chat mới */}
          <button
            className="w-full mb-4 py-2 px-3 rounded-lg bg-[#4ae168] text-black font-semibold hover:bg-[#6cf08a] transition-colors shadow-md"
            onClick={() => setShowCreateRoomModal(true)}
          >
            + Create new chat room
          </button>
          <div className="flex-1 overflow-y-auto pr-1">
            {chatRooms.map((chat) => (
              <div
                key={chat.chat_id}
                className={`group flex items-center gap-3 mb-2 px-3 py-2 rounded-lg cursor-pointer transition-all border border-transparent select-none ${
                  selectedChat === chat.chat_id
                    ? "bg-[#343541] text-white border-[#4ae168] shadow-md"
                    : "hover:bg-[#2A2B32] text-gray-200 hover:text-white hover:border-[#4ae168]"
                }`}
                onClick={() => {
                  setSelectedChat(chat.chat_id);
                  console.log("Selected chat:", chat.chat_id);
                }}
              >
                {/* Avatar tròn với chữ cái đầu */}
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#4ae168] text-black font-bold text-base shadow">
                  {chat.title.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate text-base max-w-[220px]">
                    {chat.title}
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    {chat.lastMessage}
                  </div>
                </div>
                <div className="text-xs text-gray-500 ml-2 min-w-fit">
                  {chat.time ? chat.time.slice(0, 10) : ""}
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
          {!selectedChat ? (
            <div className="w-full max-w-2xl bg-[#23272F] rounded-2xl shadow-2xl p-10 flex flex-col items-center justify-center h-[60vh] ml-10 mr-10">
              <div className="text-xl text-gray-300 text-center">
                Please select a chat room to start.
              </div>
            </div>
          ) : (
            <div className="w-full max-w-3xl bg-[#23272F] rounded-2xl shadow-2xl p-10 flex flex-col h-[80vh] ml-10 mr-10">
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
                <form
                  className="flex pt-2 border-t border-[#23272F] bg-[#23272F] sticky bottom-0 z-10"
                  onSubmit={handleSend}
                >
                  <input
                    type="text"
                    className="flex-1 rounded-full px-4 py-2 bg-[#40414F] text-white focus:outline-none text-sm border-none shadow-inner placeholder-gray-400"
                    placeholder="Type your question..."
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
          )}
        </section>
      </main>
      <Footer />
      {showCreateRoomModal && <CreateRoomModal />}
    </div>
  );
};

export default ChatPage;
