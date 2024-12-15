import React, { useEffect, useState } from "react";
import axiosInstance from "../Services/api";
import Loader from "./shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const AddTodo = ({
  createTodo,
  handleTodoDescriptionChange,
  hanldeTodoTitleChnage,
  loading,
  loggedinUser,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    function handleNavi() {
      if (loggedinUser !== "") {
        navigate("/To-doList");
      } else {
        navigate("/login");
      }
    }
    handleNavi();
  });

  return (
    <div>
      <div className="center navFull">
        <ToastContainer limit={3} />
        <div className="form-box">
          <form className="form" onSubmit={createTodo}>
            <span className="title">Create a To-Do</span>
            <span className="subtitle">Life is simpler with clear goals.</span>
            <div className="form-container">
              <input
                type="text"
                placeholder="To-Do title"
                onChange={hanldeTodoTitleChnage}
              />
              <input
                type="text"
                placeholder="Description"
                onChange={handleTodoDescriptionChange}
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
              Want to see your To-do list?{" "}
              <Link to="/to-doList">Click here</Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
