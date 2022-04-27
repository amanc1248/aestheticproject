import React, { useState } from "react";
import "../../styles/screens/Home.css";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
function HomeEmployeeLogin({ setAdminLogin }) {
  const closeLogin = () => {
    setAdminLogin(false);
  };

  // states
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  // handlers
  const employeeLoginHandler = () => {
    if (username && password) {
    }
  };
  return (
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
            <button className="login__employee__button" type="submit">
              Login as Employee
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default HomeEmployeeLogin;
