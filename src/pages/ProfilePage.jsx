import React, { useEffect, useState } from "react";
import { getProfile } from "../api/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EditProfile from "./EditProfile";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchProfile = () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Bạn chưa đăng nhập.");
      setLoading(false);
      return;
    }
    getProfile(token)
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Lỗi lấy thông tin user");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Đang tải thông tin...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 bg-gray-900">
        {error}
      </div>
    );
  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <main className="flex-1 flex flex-col items-center py-12">
        {editing ? (
          <EditProfile
            user={user}
            onSuccess={() => {
              setEditing(false);
              fetchProfile();
            }}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
            <img
              src={user.avatar || "https://i.pravatar.cc/100"}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-green-400 mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold mb-2 text-white">
              {user.name || user.fullName || "No Name"}
            </h2>
            <p className="text-gray-300 mb-4">{user.email}</p>
            <div className="w-full mb-4">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="font-medium text-gray-300">Role:</span>
                <span className="text-white capitalize">{user.role}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="font-medium text-gray-300">
                  Email Verified:
                </span>
                <span className="text-white">
                  {user.isEmailVerified ? "✔️" : "❌"}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium text-gray-300">Joined:</span>
                <span className="text-white">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              className="mt-4 bg-green-400 text-black px-6 py-2 rounded font-semibold hover:bg-green-500 transition-colors"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
