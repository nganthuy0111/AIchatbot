import React, { useEffect, useState } from "react";
import apiClient from "../api/axios";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleString();
}

const EditUserModal = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    role: user.role || "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      await apiClient.put(`/auth/users/${user._id || user.id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onSave();
    } catch (err) {
      setError("Update failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 relative w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-lg font-bold mb-4">Edit User</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded font-semibold"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await apiClient.get("/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load user list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div className="text-white">Loading user list...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">User List</h2>
      <table className="min-w-full bg-gray-900 rounded-xl shadow-lg text-sm overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-3 px-4 border-b border-gray-700 text-left font-semibold">
              Name
            </th>
            <th className="py-3 px-4 border-b border-gray-700 text-left font-semibold">
              Email
            </th>
            <th className="py-3 px-4 border-b border-gray-700 text-left font-semibold">
              Role
            </th>
            <th className="py-3 px-4 border-b border-gray-700 text-left font-semibold">
              Active
            </th>
            <th className="py-3 px-4 border-b border-gray-700 text-left font-semibold">
              Email Verified
            </th>
            <th className="py-3 px-4 border-b border-gray-700 text-left font-semibold">
              Last Login
            </th>
            <th className="py-3 px-4 border-b border-gray-700 text-left font-semibold">
              Created At
            </th>
            <th className="py-3 px-4 border-b border-gray-700 text-left font-semibold">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user._id || user.id}
                className="hover:bg-green-50/20 transition-colors"
              >
                <td className="py-3 px-4 border-b border-gray-800 text-left align-top">
                  <div className="flex items-center gap-2">
                    <img
                      src={user.avatar || "https://i.pravatar.cc/40"}
                      alt="avatar"
                      className="w-7 h-7 rounded-full object-cover border border-gray-300"
                    />
                    <span className="font-medium text-white">
                      {user.name || ""}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 border-b border-gray-800 text-left align-top text-gray-200">
                  {user.email || ""}
                </td>
                <td className="py-3 px-4 border-b border-gray-800 text-left align-top text-gray-200">
                  {user.role || ""}
                </td>
                <td className="py-3 px-4 border-b border-gray-800 text-left align-top text-gray-200">
                  {user.isActive ? "✔️" : "❌"}
                </td>
                <td className="py-3 px-4 border-b border-gray-800 text-left align-top text-gray-200">
                  {user.isEmailVerified ? "✔️" : "❌"}
                </td>
                <td className="py-3 px-4 border-b border-gray-800 text-left align-top text-gray-400">
                  {formatDate(user.lastLoginAt)}
                </td>
                <td className="py-3 px-4 border-b border-gray-800 text-left align-top text-gray-400">
                  {formatDate(user.createdAt)}
                </td>
                <td className="py-3 px-4 border-b border-gray-800 text-left align-top">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-blue-600"
                    onClick={() => setEditUser(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="py-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={() => {
            setEditUser(null);
            fetchUsers();
          }}
        />
      )}
    </div>
  );
};

export default UserManagement;
