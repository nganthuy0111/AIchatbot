import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../api/axios";

const VerifyEmailPage = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <p className="text-red-500 text-lg mb-4">
          An error occurred. Email not provided.
        </p>
        <Link to="/register" className="text-green-400 hover:underline">
          Go back to Register
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiClient.post("/auth/verify-email-code", {
        email,
        code,
      });

      toast.success("Email verified successfully! You can now log in.");
      navigate("/login");
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 400 || err.response.status === 404)
      ) {
        setError(
          "Invalid or expired verification code. Please check your code and try again."
        );
        toast.error(
          "Invalid or expired verification code. Please check your code and try again."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
        toast.error("An unexpected error occurred. Please try again.");
      }
      console.error("Verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4">Verify Your Email</h2>
        <p className="text-gray-400 mb-6">
          A 6-digit verification code has been sent to{" "}
          <span className="font-bold text-green-400">{email}</span>. Please
          enter it below.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="code">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength="6"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 text-center text-2xl tracking-[.5em] focus:outline-none focus:border-green-500"
            />
          </div>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-black py-2 rounded-md font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-500"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
