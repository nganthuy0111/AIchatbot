import React, { useEffect, useState } from "react";
import apiClient from "../api/axios";
import LegalDocumentUpload from "./LegalDocumentUpload";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString();
}

const LegalDocumentList = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  const fetchDocs = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await apiClient.get("/legal-docs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDocs(res.data);
    } catch (err) {
      setError("Không thể tải danh sách văn bản.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  // Khi upload thành công, reload lại danh sách và đóng modal
  const handleUploadSuccess = () => {
    setShowUpload(false);
    fetchDocs();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">
          Danh sách văn bản pháp luật
        </h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded font-semibold"
          onClick={() => setShowUpload(true)}
        >
          Tạo mới
        </button>
      </div>
      {loading ? (
        <div className="text-white">Đang tải danh sách...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Tên văn bản</th>
                <th className="py-2 px-4 border-b">Loại</th>
                <th className="py-2 px-4 border-b">Ngày ban hành</th>
                <th className="py-2 px-4 border-b">Người ký</th>
                <th className="py-2 px-4 border-b">File</th>
              </tr>
            </thead>
            <tbody>
              {docs && docs.length > 0 ? (
                docs.map((doc) => (
                  <tr key={doc._id || doc.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{doc.document_name}</td>
                    <td className="py-2 px-4 border-b">{doc.document_type}</td>
                    <td className="py-2 px-4 border-b">
                      {formatDate(doc.document_date_issue)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {doc.document_signee || ""}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {doc.file_url ? (
                        <a
                          href={doc.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Tải về
                        </a>
                      ) : (
                        <span className="text-gray-400">Không có file</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    Không có văn bản nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Modal upload */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 relative w-full max-w-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              onClick={() => setShowUpload(false)}
            >
              &times;
            </button>
            <LegalDocumentUpload onSuccess={handleUploadSuccess} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalDocumentList;
