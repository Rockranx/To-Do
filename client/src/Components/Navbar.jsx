import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ThemeButton from "./shared/ThemeButton";
import { IoMdCloseCircle } from "react-icons/io";
import { TiThMenuOutline } from "react-icons/ti";
const Navbar = ({ loggedinUser }) => {
  const [open, setOpen] = useState(false);


  return (
    <>
      <div className="fullcontainer">
        <div className="logoside"></div>
        <div className="mobile-nav-box">
          <span onClick={() => setOpen(!open)} className="icon-size">
            <TiThMenuOutline />
          </span>
        </div>
        <div className="clown">
          <div className="dropdown">
            <i className="fa fa-user icon-circle"></i>
          </div>
          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            <ul>
              {loggedinUser !== "" ? (
                <>
                  <Link to="/to-doList" onClick={() => setOpen(false)}>
                    <li className="d_flex dropdown-menu-icon">
                      <div>
                        <a>To-Do List</a>
                      </div>
                      <div>
                        <i className="fa-regular fa-user"></i>
                      </div>
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" onClick={() => setOpen(false)}>
                    <li className="d_flex dropdown-menu-icon">
                      <div>
                        <a>Register</a>
                      </div>
                      <div>
                        <i className="fa-regular fa-user"></i>
                      </div>
                    </li>
                  </Link>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    <li className="d_flex dropdown-menu-icon">
                      <div>
                        <a>Login</a>
                      </div>
                      <div>
                        <i className="fa-solid fa-truck-fast"></i>
                      </div>
                    </li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="titlebox">
          <h1>
            <Link to="/">
              <span>To-Do List</span>
            </Link>
          </h1>
        </div>
        <div className="itemside">
          {loggedinUser !== "" ? (
            <>
              <div className="navblocks">
                <Link to="/To-DoList">
                  <button>To-Do List</button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="navblocks">
                <Link to="/register">
                  <button>Register</button>
                </Link>
              </div>
              <div className="navblocks">
                <Link to="/login">
                  <button>Login</button>
                </Link>
              </div>
            </>
          )}

          <div className="navblocks">
            <ThemeButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
