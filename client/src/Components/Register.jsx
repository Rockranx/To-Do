import React, { useEffect, useState } from "react";
import axiosInstance from "../Services/api";
import Loader from "./shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = ({
  handleRegisterEmailChange,
  registerFormSubmit,
  handleRegisterPasswordChange,
  handleRegisterUsernameChange,
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
    //   handleNavi();
  });
  return (
    <div className="center navFull">
      <ToastContainer limit={3} />
      <div className="form-box">
        <form className="form" onSubmit={registerFormSubmit}>
          <span className="title">Sign up</span>
          <span className="subtitle">
            Create a free account with your email.
          </span>
          <div className="form-container">
            <input
              type="text"
              placeholder="Username"
              onChange={handleRegisterUsernameChange}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={handleRegisterEmailChange}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handleRegisterPasswordChange}
            />
          </div>
          <button type="submit">
            {loading ? (
              <>
                <Loader />
              </>
            ) : (
              <>Submit</>
            )}
          </button>
        </form>
        <div className="form-section">
          <p>
            Have an account? <Link to="/login">Log in</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
