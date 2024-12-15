import React, { useEffect, useState } from "react";
import axiosInstance from "../Services/api";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./shared/Loader";
import { toast, ToastContainer } from "react-toastify";

const TodoList = ({
  UpdateTodo,
  handleUpdateTitle,
  setSelectedTodoId,
  setUpdatedCompleted,
  handleUpdateDescription,
  handleUpdateCompleted,
  loading,
  deleteTodo,
  deletedSuccess,
  setDeletedSuccess,
  loggedinUser,
}) => {
  const [todo, setTodo] = useState([]);
  const [todoLoading, setTodoLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getalltodod = async () => {
      setTodoLoading(true);
      try {
        await axiosInstance.get("/todo").then(function (response) {
          if (response.status === 200) {
            setTodo(response.data.todos);

            setTodoLoading(false);
          }
        });
        if (deletedSuccess == true) {
          closePopup();
          setSelectedTodoId("");
          setDeletedSuccess(false);
        }
      } catch (error) {
        setTodoLoading(false);
      }
    };
    getalltodod();
  }, [showPopup]);
  const handleViewTodo = (todo) => {
    setSelectedTodo(todo);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedTodo(null);
  };

  useEffect(() => {
    function handleNavi() {
      if (loggedinUser !== "") {
        navigate("/To-doList");
      } else {
        navigate("/login");
      }
    }
    handleNavi();
  }, []);
  return (
    <div>
      <ToastContainer limit={3} />
      <div className="navFull paddy grid-container">
        {todoLoading ? (
          <>
            <div className="navFuller center">
              <Loader />
            </div>
          </>
        ) : (
          <>
            {" "}
            {todo.map((data, index) => {
              return (
                <>
                  <div className="itemBox" key={index}>
                    <div className="card">
                      <div className="image_container">
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="image"
                        >
                          <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path>
                        </svg>
                      </div>
                      <div className="title">
                        <span>{data.title}</span>
                      </div>
                      <div className="size">
                        <span>{data.description}</span>
                        <span className="list-size">
                          {data.completed ? <>Completed</> : <>Not Completed</>}
                        </span>
                      </div>
                      <div className="action">
                        <button
                          className="cart-button"
                          onClick={() => {
                            handleViewTodo(data);
                            setSelectedTodoId(data._id);
                          }}
                        >
                          <span>View Item</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        )}
        {showPopup && (
          <>
            {showUpdate ? (
              <>
                <div className="popup-overlay">
                  <div className="popup-content">
                    <form className="form" onSubmit={UpdateTodo}>
                      <div className="popright">
                        <button
                          onClick={() => {
                            closePopup();
                            setShowUpdate(false);
                            setSelectedTodoId("");
                          }}
                        >
                          &times;
                        </button>
                      </div>
                      <span className="title">Update {selectedTodo.title}</span>
                      <span className="subtitle"></span>
                      <div className="form-container">
                        <input
                          type="text"
                          placeholder="Enter Title"
                          onChange={handleUpdateTitle}
                        />
                        <input
                          type="text"
                          placeholder="Enter Description"
                          onChange={handleUpdateDescription}
                        />
                        <select
                          type="password"
                          placeholder="Password"
                          onChange={handleUpdateCompleted}
                        >
                          <option value=""></option>
                          <option
                            value="true"
                            onClick={() => setUpdatedCompleted(true)}
                          >
                            True
                          </option>
                          <option
                            value="false"
                            onClick={() => setUpdatedCompleted(true)}
                          >
                            False
                          </option>
                        </select>
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
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="popup-overlay">
                  <div className="popup-content">
                    <div className="popright">
                      <button
                        onClick={() => {
                          closePopup();
                        }}
                      >
                        &times;
                      </button>
                    </div>
                    <h2>
                      Title:{"  "}
                      {selectedTodo.title}
                    </h2>
                    <p>
                      Description:{"  "}
                      {selectedTodo.description}
                    </p>
                    <p>
                      Completed:{"  "}
                      {selectedTodo.completed ? (
                        <>Completed</>
                      ) : (
                        <>Not Completed</>
                      )}
                    </p>
                    <div className="splitted">
                      <button className="close-button" onClick={deleteTodo}>
                        {loading ? (
                          <>
                            <Loader />
                          </>
                        ) : (
                          <>Delete</>
                        )}
                      </button>
                      <button
                        className="update-button"
                        onClick={() => {
                          setShowUpdate(true);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
        <Link to="/create-to-do" className="floating-button">
          <span className="tooltip">Create Todo</span>
          <span className="plus-icon">+</span>
        </Link>
      </div>
    </div>
  );
};

export default TodoList;
