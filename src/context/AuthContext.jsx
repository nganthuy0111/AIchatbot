import React, { createContext, useState, useContext, useEffect } from "react";
import apiClient from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token and account_id in localStorage to persist login state
    const token = localStorage.getItem("token");
    const account_id = localStorage.getItem("account_id");
    const role = localStorage.getItem("role");
    const avatar = localStorage.getItem("avatar");
    if (token && account_id && role) {
      setUser({ token, account_id, role, avatar });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("account_id", userData.account_id); // Lưu cả account_id
    if (userData.role) {
      localStorage.setItem("role", userData.role);
    }
    if (userData.avatar) {
      localStorage.setItem("avatar", userData.avatar);
    }
  };

  const logout = async () => {
    try {
      const token = user?.token || localStorage.getItem("token");
      if (token) {
        await apiClient.post(
          "/auth/logout",
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch {
      // Có thể log lỗi hoặc bỏ qua nếu backend không yêu cầu logout
    }
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("account_id"); // Xoá account_id khi logout
    localStorage.removeItem("role"); // Xoá role khi logout
    localStorage.removeItem("avatar"); // Xoá avatar khi logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
