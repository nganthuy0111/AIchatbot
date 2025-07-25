import React, { useEffect, useState } from "react";
import apiClient from "../api/axios";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleString();
}

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await apiClient.get("/feedbacks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbacks(res.data);
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách feedback.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  if (loading)
    return <div className="text-white">Đang tải danh sách feedback...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">Danh sách Feedback</h2>
      <table className="min-w-full bg-white rounded shadow text-sm">
        <thead>
          <tr>
            {/* Bỏ cột ID */}
            <th className="py-2 px-4 border-b text-left">Người dùng</th>
            <th className="py-2 px-4 border-b text-left min-w-[200px]">
              Nội dung
            </th>
            <th className="py-2 px-4 border-b text-left">Trạng thái</th>
            <th className="py-2 px-4 border-b text-left">Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((fb) => (
              <tr key={fb._id} className="hover:bg-gray-100">
                {/* Avatar và tên người dùng */}
                <td className="py-2 px-4 border-b text-left align-top">
                  <div className="flex items-center gap-2">
                    <img
                      src={fb.user_avatar || "https://i.pravatar.cc/40"}
                      alt="avatar"
                      className="w-7 h-7 rounded-full object-cover border border-gray-300"
                    />
                    <span>{fb.user_name || fb.user_id || "Người dùng"}</span>
                  </div>
                </td>
                <td className="py-2 px-4 border-b text-left align-top break-words min-w-[200px] max-w-xs">
                  {fb.content}
                </td>
                <td className="py-2 px-4 border-b text-left align-top">
                  {fb.status}
                </td>
                <td className="py-2 px-4 border-b text-left align-top">
                  {formatDate(fb.createdAt)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-500">
                Không có feedback nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackManagement;
