import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router";
import { auth } from "../../Firebase/firebase.config";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
        setEmail("");
        // Redirect to login page after 3s
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <div className="card shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <form onSubmit={handleReset} className="flex flex-col gap-3">
          <label>Email</label>
          <input
            type="email"
            className="input input-bordered"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success mt-3">
            Send Reset Link
          </button>
        </form>
        <p className="mt-3 text-center">
          Remembered?{" "}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
