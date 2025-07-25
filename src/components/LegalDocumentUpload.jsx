import React, { useState } from "react";
import { apiChatbotLawClient } from "../api/axios";

const LegalDocumentUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "application/pdf") {
      setError("Only PDF files are allowed!");
      setFile(null);
      return;
    }
    setError(null);
    setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    if (!file) {
      setError("Please select a PDF file!");
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      data.append("file", file);
      await apiChatbotLawClient.post("/Legal/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("Upload successful!");
      setFile(null);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Upload failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded shadow p-6">
      <h2 className="text-xl font-bold mb-4">Upload Legal Document (PDF)</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">PDF File *</label>
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
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default LegalDocumentUpload;
