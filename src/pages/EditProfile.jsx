import React, { useState } from "react";
import { updateProfile } from "../api/axios";

const EditProfile = ({ user, onSuccess, onCancel }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await updateProfile({ name, email, avatar }, token);
      onSuccess && onSuccess();
    } catch (err) {
      setError(err.message || err.error || "Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg"
    >
      <h3 className="text-xl font-bold text-white mb-2">
        Chỉnh sửa thông tin cá nhân
      </h3>
      <div>
        <label className="block text-gray-300 mb-1">Tên</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-green-500"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-900 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:border-green-500"
        />
      </div>
      <div>
        <label className="block text-gray-300 mb-1">
          Ảnh đại diện (jpg, png)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          className="w-full text-gray-300"
        />
      </div>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 text-black px-4 py-2 rounded font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-500"
        >
          {loading ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
