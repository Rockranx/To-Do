import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./shared/Loader";
import { toast, ToastContainer } from "react-toastify";

const Login = ({
  handleLoginEmailChange,
  handleLoginPasswordChange,
  loginFormSubmit,
  loading,
  loggedinUser,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    function handleNavi() {
      if (loggedinUser !== "") {
        toast("User Already Logged in");
        navigate("/To-doList");
      }
    }
    handleNavi();
  });

  return (
    <div>
      <div className="center navFull">
        <ToastContainer limit={3} />
        <div className="form-box">
          <form className="form" onSubmit={loginFormSubmit}>
            <span className="title">Login</span>
            <span className="subtitle">
              Login to your account with your email.
            </span>
            <div className="form-container">
              <input
                type="email"
                placeholder="Email"
                onChange={handleLoginEmailChange}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={handleLoginPasswordChange}
              />
            </div>
            <button type="submit">
              {loading ? (
                <>
                  <Loader />
                </>
              ) : (
                <>Login</>
              )}
            </button>
          </form>
          <div className="form-section">
            <p>
              Don't have an account? <Link to="/register">Register here</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
