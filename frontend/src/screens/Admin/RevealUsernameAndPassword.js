import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function RevealUsernameAndPassword({ setRevealUPass, employee }) {
  const closeRevealUPass = () => {
    setRevealUPass(false);
  };
  // states

  return (
    <>
      <div>
        <div className="home__admin__login">
          <div className="employee__add__container">
            <div className="title__and__close">
              <div className="admin__login__title">Employee Credentials</div>
              <div className="close__icon">
                <CloseIcon onClick={closeRevealUPass}></CloseIcon>
              </div>
            </div>

            <div>
              <b>USERNAME: </b> {employee.username} <br />
              <b>PASSWORD: </b> {employee.password} <br />
              <b>EMAIL: </b> {employee.email} <br />
              <b>EMAIL PASSWORD: </b> {employee.email_password} <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RevealUsernameAndPassword;
