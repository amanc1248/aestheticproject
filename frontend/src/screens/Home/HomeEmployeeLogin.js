import React, { useState, useEffect } from "react";
import "../../styles/screens/Home.css";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { employeeLoginAction } from "../../actions/employeeActions";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
function HomeEmployeeLogin({ setAdminLogin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeLogin = () => {
    setAdminLogin(false);
  };

  // states
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  // handlers
  const employeeLoginHandler = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(employeeLoginAction(username, password));
    }
  };

  // selectors
  const { loading, employeeLogin, error } = useSelector(
    (state) => state.employeeLoginReducer
  );

  // useEffect
  useEffect(() => {
    if (employeeLogin === "Success") {
      navigate("/employee");
    }
  }, [employeeLogin, navigate]);

  return (
    <>
      <div className="home__admin__login">
        <form action="">
          <div className="login__container">
            <div className="title__and__close">
              <div className="admin__login__title">Login as employee</div>
              <div className="close__icon">
                <CloseIcon onClick={closeLogin}></CloseIcon>
              </div>
            </div>
            <div>
              <label htmlFor="username" className="admin__login__label">
                Username<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="text"
                required
                id="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <br />
              <label htmlFor="password">
                Password
                <span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="password"
                id="password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <button
                className="login__employee__button"
                type="submit"
                onClick={employeeLoginHandler}
              >
                Login as Employee
              </button>
            </div>
            {loading && <Loader></Loader>}
            {error && <Message variant="danger">{error}</Message>}
            {employeeLogin && <Message>{"Login Successful"}</Message>}
          </div>
        </form>
      </div>
    </>
  );
}
export default HomeEmployeeLogin;
