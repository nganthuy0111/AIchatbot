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

export const getProfile = async (token) => {
  try {
    const response = await axios.get(
      "https://be-edulaw-production.up.railway.app/api/profile/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateProfile = async (data, token) => {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.email) formData.append("email", data.email);
  if (data.avatar) formData.append("avatar", data.avatar);

  const response = await fetch(
    "https://be-edulaw-production.up.railway.app/api/profile/me",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        // Không set Content-Type, để browser tự set boundary cho multipart
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData;
  }
  return await response.json();
};

export default apiClient;
export { apiChatbotLawClient };
