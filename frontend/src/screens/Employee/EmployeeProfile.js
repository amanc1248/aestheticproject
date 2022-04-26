import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function EmployeeProfile({ setEmployeeProfile }) {
  const closeEmployeeProfile = () => {
    setEmployeeProfile(false);
  };
  return (
    <div>
      <div>
        <div>
          <div className="home__admin__login">
            <div className="employee__add__container">
              <div className="title__and__close">
                <div className="admin__login__title">
                  Logout from your profile:
                </div>
                <div className="close__icon">
                  <CloseIcon onClick={closeEmployeeProfile}></CloseIcon>
                </div>
              </div>

              <div>
                <button className="login__employee__button">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;