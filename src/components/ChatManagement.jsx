import React, { useEffect, useState } from "react";
import apiClient from "../api/axios";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleString();
}

const ChatManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await apiClient.get("/questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(res.data);
      } catch (err) {
        setError("Failed to load questions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  if (loading) return <div className="text-white">Loading questions...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">
        User Chat Questions
      </h2>
      <table className="min-w-full bg-white rounded shadow text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Question ID</th>
            <th className="py-2 px-4 border-b text-left min-w-[200px]">
              Content
            </th>
            <th className="py-2 px-4 border-b text-left">Date</th>
            <th className="py-2 px-4 border-b text-left">User ID</th>
            <th className="py-2 px-4 border-b text-left">Chat ID</th>
          </tr>
        </thead>
        <tbody>
          {questions && questions.length > 0 ? (
            questions.map((q) => (
              <tr key={q._id || q.question_id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-left align-top">
                  {q.question_id}
                </td>
                <td className="py-2 px-4 border-b text-left align-top break-words min-w-[200px] max-w-xs">
                  {q.question_content}
                </td>
                <td className="py-2 px-4 border-b text-left align-top">
                  {formatDate(q.question_date)}
                </td>
                <td className="py-2 px-4 border-b text-left align-top">
                  {q.account_id}
                </td>
                <td className="py-2 px-4 border-b text-left align-top">
                  {q.chat_id}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-4 text-center text-gray-500">
                No questions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChatManagement;
