import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import logo from "../assets/logoEduLawAI.png";
import UserManagement from "../components/UserManagement";
import FeedbackManagement from "../components/FeedbackManagement";
import LegalDocumentUpload from "../components/LegalDocumentUpload";
import LegalDocumentList from "../components/LegalDocumentList";
import ChatManagement from "../components/ChatManagement";

const menuItems = [
  { key: "dashboard", label: "Dashboard" },
  { key: "users", label: "User Management" },
  { key: "feedback", label: "Feedback Management" },
  { key: "legalClause", label: "Legal Clause" },
  { key: "legalDocument", label: "Legal Document" },
];

const AdminManagementPage = () => {
  const { user } = useAuth();
  const [selectedMenu, setSelectedMenu] = React.useState("dashboard");

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white flex flex-col p-4">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 mr-2 object-contain"
          />
          <span
            className="font-bold text-xl cursor-pointer transition-colors hover:text-green-400"
            onClick={() => (window.location.href = "/")}
          >
            ELA
          </span>
        </div>
        {/* User Info */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://i.pravatar.cc/60"
            alt="avatar"
            className="w-14 h-14 rounded-full mb-2 border-2 border-green-400"
          />
          <span className="text-xs text-gray-300">Welcome</span>
        </div>
        {/* Search */}
        <input
          type="text"
          placeholder="Type to search..."
          className="mb-4 px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
        />
        {/* Menu */}
        <nav className="flex-1">
          <ul>
            {menuItems.map((item) => (
              <li key={item.key}>
                <button
                  className={`w-full text-left px-4 py-2 rounded mb-2 transition font-medium ${
                    selectedMenu === item.key
                      ? "bg-green-400 text-black"
                      : "hover:bg-gray-900 text-white"
                  }`}
                  onClick={() => setSelectedMenu(item.key)}
                >
                  {item.label}
                  {item.key === "dashboard" && (
                    <span className="ml-2 bg-green-400 text-black text-xs px-2 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-black text-white px-8 py-4 shadow">
          <div className="flex space-x-8">
            <button className="font-semibold border-b-2 border-green-400 pb-1">
              Statistic
            </button>
            <button className="font-semibold text-gray-300 hover:text-green-400">
              Calendar
            </button>
            <button className="font-semibold text-gray-300 hover:text-green-400">
              Employee
            </button>
          </div>
          <div className="flex items-center space-x-4">
            {/* Chỉ giữ lại một chuông thông báo, xóa nút chuông thứ hai */}
            <button className="relative">
              <span className="absolute -top-1 -right-1 bg-green-400 rounded-full w-3 h-3 border-2 border-black"></span>
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            {/* Icon user chuyển sang trang profile */}
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-green-400 transition-colors"
              title="Profile"
              onClick={() => (window.location.href = "/profile")}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            {/* Bỏ hiển thị id, chỉ giữ lại chữ Admin */}
            <span className="font-semibold">Admin</span>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-900 min-h-screen">
          {selectedMenu === "users" ? (
            <div className="col-span-3">
              <UserManagement />
            </div>
          ) : selectedMenu === "feedback" ? (
            <div className="col-span-3">
              <FeedbackManagement />
            </div>
          ) : selectedMenu === "legalClause" ? (
            <div className="col-span-3">
              <LegalDocumentList />
            </div>
          ) : selectedMenu === "legalDocument" ? (
            <div className="col-span-3">
              <LegalDocumentUpload />
            </div>
          ) : (
            <>
              {/* Card 1: Sessions By Channel */}
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-green-100">
                <div className="text-lg font-semibold mb-2 text-black">
                  Sessions By Channel
                </div>
                <div className="w-24 h-24 rounded-full border-8 border-green-400 flex items-center justify-center text-2xl font-bold text-green-600 mb-2">
                  75%
                </div>
                <ul className="text-sm text-gray-500">
                  <li>Firewalls(3) 4(100%)</li>
                  <li>Ports(12) 12(100%)</li>
                  <li>Servers(233) 2(100%)</li>
                </ul>
              </div>
              {/* Card 2: Events */}
              <div className="bg-white rounded-xl shadow p-6 border border-green-100">
                <div className="text-lg font-semibold mb-2 text-black">
                  Events
                </div>
                <div className="h-24 flex items-end">
                  <div className="w-full h-16 bg-gradient-to-t from-green-200 to-green-400 rounded"></div>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-red-500">Critical</span>
                  <span className="text-yellow-500">Warning</span>
                  <span className="text-gray-500">Error</span>
                </div>
              </div>
              {/* Card 3: Device Stats */}
              <div className="bg-white rounded-xl shadow p-6 border border-green-100">
                <div className="text-lg font-semibold mb-2 text-black">
                  Device Stats
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  Uptime: 195 Days, 8 hours
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  First Seen: 23 Sep 2019, 2:04PM
                </div>
                <div className="text-sm text-gray-500 mb-1">Memory space</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-green-400 h-2 rounded-full"
                    style={{ width: "80%" }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">168.3GB</div>
              </div>
              {/* Card 4: Sales Analytics */}
              <div className="bg-white rounded-xl shadow p-6 col-span-2 border border-green-100">
                <div className="text-lg font-semibold mb-2 text-black">
                  Sales Analytics
                </div>
                <div className="flex space-x-8 mb-4">
                  <div>
                    <span className="text-green-600 font-bold text-xl">
                      23,342
                    </span>{" "}
                    <span className="text-xs">Online</span>
                  </div>
                  <div>
                    <span className="text-black font-bold text-xl">13,221</span>{" "}
                    <span className="text-xs">Offline</span>
                  </div>
                  <div>
                    <span className="text-yellow-600 font-bold text-xl">
                      1,542
                    </span>{" "}
                    <span className="text-xs">Marketing</span>
                  </div>
                </div>
                <div className="h-24 bg-gradient-to-r from-green-200 to-green-400 rounded"></div>
              </div>
              {/* Card 5: Card Title */}
              <div className="bg-white rounded-xl shadow p-6 border border-green-100">
                <div className="text-lg font-semibold mb-2 text-black">
                  Card Title
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  287,493$
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  1.4% Since Last Month
                </div>
                <div className="h-12 bg-gradient-to-t from-green-200 to-green-400 rounded"></div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminManagementPage;
