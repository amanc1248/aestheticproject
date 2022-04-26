import React, { useState } from "react";
import "../../styles/screens/Home.css";
import CloseIcon from "@mui/icons-material/Close";
function HomeAdminLogin({ setAdminLogin }) {
  const closeLogin = () => {
    setAdminLogin(false);
  };
  return (
    <div className="home__admin__login">
      <form action="">
        <div className="login__container">
          <div className="title__and__close">
            <div className="admin__login__title">Login as admin</div>
            <div className="close__icon">
              <CloseIcon onClick={closeLogin}></CloseIcon>
            </div>
          </div>
          <label htmlFor="admin__login" className="admin__login__label">
            Admin pass<span style={{ color: "red" }}>*</span>
          </label>
          <input type="password" id="admin__login" required />
          <div>
            <button className="login__employee__button" type="submit">
              Login as Admin
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default HomeAdminLogin;
