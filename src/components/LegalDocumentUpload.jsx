import React, { useState } from "react";
import apiClient from "../api/axios";

const LegalDocumentUpload = ({ onSuccess }) => {
  const [form, setForm] = useState({
    document_name: "",
    document_type: "",
    document_date_issue: "",
    document_signee: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      if (file && file.type !== "application/pdf") {
        setError("Chỉ cho phép upload file PDF!");
        setForm((prev) => ({ ...prev, file: null }));
        return;
      }
      setError(null);
      setForm((prev) => ({ ...prev, file }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    if (
      !form.document_name ||
      !form.document_type ||
      !form.document_date_issue ||
      !form.file
    ) {
      setError("Vui lòng nhập đầy đủ thông tin và chọn file PDF!");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("document_name", form.document_name);
      data.append("document_type", form.document_type);
      data.append("document_date_issue", form.document_date_issue);
      if (form.document_signee)
        data.append("document_signee", form.document_signee);
      data.append("file", form.file);
      await apiClient.post("/legal-docs/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Tải lên thành công!");
      setForm({
        document_name: "",
        document_type: "",
        document_date_issue: "",
        document_signee: "",
        file: null,
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Tải lên thất bại!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        Tải lên văn bản pháp luật (PDF)
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Tên văn bản *</label>
          <input
            type="text"
            name="document_name"
            value={form.document_name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Loại văn bản *</label>
          <input
            type="text"
            name="document_type"
            value={form.document_type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Ngày ban hành *</label>
          <input
            type="date"
            name="document_date_issue"
            value={form.document_date_issue}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Người ký</label>
          <input
            type="text"
            name="document_signee"
            value={form.document_signee}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">File PDF *</label>
          <input
            type="file"
            name="file"
            accept="application/pdf"
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {message && <div className="text-green-600 text-sm">{message}</div>}
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded font-semibold"
          disabled={loading}
        >
          {loading ? "Đang tải lên..." : "Tải lên"}
        </button>
      </form>
    </div>
  );
};

export default LegalDocumentUpload;
