import { useEffect, useState } from "react";
import axiosInstance from "./Services/api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import TodoList from "./Components/TodoList";
import AddTodo from "./Components/AddTodo";
import ErrorPage from "./Components/ErrorPage";

function App() {
  const [selectedTodoId, setSelectedTodoId] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedCompleted, setUpdatedCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletedSuccess, setDeletedSuccess] = useState(false);

  const [loggedinUser, setLoggedinUser] = useState("");

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    const checkTokenOnLoad = () => {
      const usertoken =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      if (!usertoken) {
        console.log("No token found.");
        return;
      }

      try {
        const decodedToken = jwtDecode(usertoken);

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          setLoggedinUser("");
        } else {
          setLoggedinUser(decodedToken.userId);
        }

        const convertToLocalTime = (timestamp) =>
          new Date(timestamp * 1000).toLocaleString();
      } catch (error) {
        console.error("Invalid token:", error.message);
      }
    };
    checkTokenOnLoad();
  });

  const handleUpdateTitle = (e) => {
    setUpdatedTitle(e.target.value);
  };
  const handleUpdateDescription = (e) => {
    setUpdatedDescription(e.target.value);
  };
  const handleUpdateCompleted = (e) => {
    setUpdatedCompleted(e.target.value);
  };

  // Login User logic

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
  };
  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };

  const loginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance
        .post("/auth/login", {
          email: loginEmail,
          password: loginPassword,
        })
        .then(function (response) {
          setLoading(false);
          const lineId = "Success";
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            toast.success("User Logged in", {
              toastId: lineId,
            });
          }
        })
        .catch(function (error) {
          setLoading(false);
          const errorId = "Error";
          toast.error(error.response.data.message, {
            toastId: errorId,
          });
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //Register User Logic
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUserName, setRegisterUserName] = useState("");

  const handleRegisterEmailChange = (e) => {
    setRegisterEmail(e.target.value);
  };
  const handleRegisterPasswordChange = (e) => {
    setRegisterPassword(e.target.value);
  };
  const handleRegisterUsernameChange = (e) => {
    setRegisterUserName(e.target.value);
  };

  const registerFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance
        .post("/auth/register", {
          username: registerUserName,
          email: registerEmail,
          password: registerPassword,
        })
        .then(function (response) {
          setLoading(false);
          const lineId = "Success";
          if (response.status === 200) {
            toast.success("Account Created", {
              toastId: lineId,
            });
          }
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
          const errorId = "Error";
          toast.error(error.response.data.message, {
            toastId: errorId,
          });
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // create to-do
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const hanldeTodoTitleChnage = (e) => {
    setTodoTitle(e.target.value);
  };
  const handleTodoDescriptionChange = (e) => {
    setTodoDescription(e.target.value);
  };

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance
        .post("/todo/create", {
          title: todoTitle,
          description: todoDescription,
        })
        .then(function (response) {
          setLoading(false);
          const lineId = "Success";

          toast.success("To-Do Created", {
            toastId: lineId,
          });
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
          const errorId = "Error";
          toast.error(error.response.data.message, {
            toastId: errorId,
          });
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Get all to-do logic
  useEffect(() => {
    const getalltodod = async () => {
      try {
        const response = await axiosInstance.get("/todo");
      } catch (error) {
        console.log(error);
      }
    };
    getalltodod();
  }, []);

  const getTodobyID = async () => {
    try {
      await axiosInstance
        .get(`/todo/${selectedTodo}`)
        .then(function (response) {})
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Update To-Do Logic
  const UpdateTodo = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setDeletedSuccess(false);
      await axiosInstance
        .put(`/todo/update/${selectedTodoId}`, {
          title: updatedTitle,
          description: updatedDescription,
          completed: updatedCompleted,
        })
        .then(function (response) {
          setDeletedSuccess(true);
          setLoading(false);

          const lineId = "Success";

          toast.success("To-Do Updated", {
            toastId: lineId,
          });
        })
        .catch(function (error) {
          setDeletedSuccess(false);
          setLoading(false);
          console.log(error);
          const errorId = "Error";
          toast.error(error.response.data.message, {
            toastId: errorId,
          });
        });
    } catch (error) {
      setDeletedSuccess(false);
      setLoading(false);
      console.log(error);
    }
  };
  // To-Do Delete Logic
  const deleteTodo = async () => {
    try {
      setLoading(true);
      await axiosInstance
        .delete(`/todo/delete/${selectedTodoId}`)
        .then(function (response) {
          setLoading(false);
          const lineId = "Success";

          toast.success("To-Do Deleted", {
            toastId: lineId,
          });
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
          const errorId = "Error";
          toast.error(error.response.data.message, {
            toastId: errorId,
          });
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Navbar
          toggleTheme={toggleTheme}
          theme={theme}
          loggedinUser={loggedinUser}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/register"
            element={
              <Register
                registerFormSubmit={registerFormSubmit}
                handleRegisterUsernameChange={handleRegisterUsernameChange}
                handleRegisterPasswordChange={handleRegisterPasswordChange}
                handleRegisterEmailChange={handleRegisterEmailChange}
                loading={loading}
                loggedinUser={loggedinUser}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                handleLoginEmailChange={handleLoginEmailChange}
                loginFormSubmit={loginFormSubmit}
                handleLoginPasswordChange={handleLoginPasswordChange}
                loading={loading}
                loggedinUser={loggedinUser}
              />
            }
          />
          <Route
            path="/To-doList"
            element={
              <TodoList
                handleUpdateCompleted={handleUpdateCompleted}
                handleUpdateDescription={handleUpdateDescription}
                handleUpdateTitle={handleUpdateTitle}
                UpdateTodo={UpdateTodo}
                setUpdatedCompleted={setUpdatedCompleted}
                setSelectedTodoId={setSelectedTodoId}
                loading={loading}
                deleteTodo={deleteTodo}
                deletedSuccess={deletedSuccess}
                setDeletedSuccess={setDeletedSuccess}
                loggedinUser={loggedinUser}
              />
            }
          />
          <Route
            path="/Create-To-do"
            element={
              <AddTodo
                hanldeTodoTitleChnage={hanldeTodoTitleChnage}
                handleTodoDescriptionChange={handleTodoDescriptionChange}
                createTodo={createTodo}
                loading={loading}
                loggedinUser={loggedinUser}
              />
            }
          />
          <Route exact path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
