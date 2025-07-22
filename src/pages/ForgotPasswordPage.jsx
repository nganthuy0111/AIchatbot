import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../api/axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.post("/auth/forgot-password", { email });
      toast.success(
        "If an account with that email exists, a password reset link has been sent."
      );
    } catch (error) {
      // We still show a success message to prevent email enumeration
      toast.success(
        "If an account with that email exists, a password reset link has been sent."
      );
      console.error("Forgot password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Forgot Password</h2>
        <p className="text-center text-gray-400 mb-6">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-black py-2 rounded-md font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-500"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-6">
          Remember your password?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
