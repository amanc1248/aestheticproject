import React, { useState } from "react";
import "../../styles/screens/Home.css";
import CloseIcon from "@mui/icons-material/Close";
function HomeEmployeeLogin({ setAdminLogin }) {
  const closeLogin = () => {
    setAdminLogin(false);
  };
  return (
    <div className="home__admin__login">
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
          <input type="text" required id="username" />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" id="password" required />
        </div>
        <div>
          <button className="login__employee__button">Login as Employee</button>
        </div>
      </div>
    </div>
  );
}
export default HomeEmployeeLogin;
