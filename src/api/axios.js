import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://be-edulaw-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const apiChatbotLawClient = axios.create({
  baseURL: "https://aichatbotlaw.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor cho response: tự động logout khi token hết hạn
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("account_id");
      window.location.href = "/login"; // Chuyển hướng về login
    }
    return Promise.reject(error);
  }
);

export default apiClient;
export { apiChatbotLawClient };
