import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
// import "../../styles/screens/Admin.css";
function ChangeEmployeePassword({ setChangePassword }) {
  const closeChangePassword = () => {
    setChangePassword(false);
  };
  // states
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  return (
    <div>
      <div>
        <div className="home__admin__login">
          <div className="employee__add__container">
            <div className="title__and__close">
              <div className="admin__login__title">Change Password</div>
              <div className="close__icon">
                <CloseIcon onClick={closeChangePassword}></CloseIcon>
              </div>
            </div>

            <div>
              <label htmlFor="oldpassword" className="admin__login__label">
                old password<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="password"
                id="oldpassword"
                required
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="newpassword" className="admin__login__label">
                new password<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="password"
                id="newpassword"
                required
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
              />
            </div>

            <div>
              <button className="login__employee__button">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeEmployeePassword;
