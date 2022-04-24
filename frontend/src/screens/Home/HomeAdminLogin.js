import React, { useState } from "react";
import "../../styles/screens/Home.css";
import CloseIcon from "@mui/icons-material/Close";
function HomeAdminLogin({ setAdminLogin }) {
  const closeLogin = () => {
    setAdminLogin(false);
  };
  return (
    <div className="home__admin__login">
      <div className="login__container">
        <div className="title__and__close">
          <div className="admin__login__title">Login as admin</div>
          <div className="close__icon">
            <CloseIcon onClick={closeLogin}></CloseIcon>
          </div>
        </div>
        <div>
          <label htmlFor="admin__login" className="admin__login__label">
            Admin pass<span style={{ color: "red" }}>*</span>
          </label>
          <br />
          <input type="password" id="admin__login" required />
        </div>
        <div>
          <button className="login__employee__button">Login as Admin</button>
        </div>
      </div>
    </div>
  );
}
export default HomeAdminLogin;
