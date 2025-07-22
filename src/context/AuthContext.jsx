import React, { createContext, useState, useContext, useEffect } from "react";
import apiClient from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for token and account_id in localStorage to persist login state
    const token = localStorage.getItem("token");
    const account_id = localStorage.getItem("account_id");
    if (token && account_id) {
      setUser({ token, account_id });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("account_id", userData.account_id); // Lưu cả account_id
  };

  const logout = async () => {
    try {
      const token = user?.token || localStorage.getItem("token");
      if (token) {
        await apiClient.post("/auth/logout", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (err) {
      // Có thể log lỗi hoặc bỏ qua nếu backend không yêu cầu logout
    }
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("account_id"); // Xoá account_id khi logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
