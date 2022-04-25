import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function FreeEmployee({ setFreeEmployee }) {
  const closeDeleteEmployee = () => {
    setFreeEmployee(false);
  };
  return (
    <div>
      <div>
        <div className="home__admin__login">
          <div className="employee__add__container">
            <div className="title__and__close">
              <div className="admin__login__title">Delete Employee</div>
              <div className="close__icon">
                <CloseIcon onClick={closeDeleteEmployee}></CloseIcon>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="admin__login__label">
                Name:
              </label>
              <br />
            </div>
            <div>
              <label htmlFor="email" className="admin__login__label">
                Email:
              </label>
              <br />
            </div>
            <div>
              <label htmlFor="username" className="admin__login__label">
                username:
              </label>
              <br />
            </div>

            <div>
              <label htmlFor="designation" className="admin__login__label">
                designation:
              </label>
              <br />
            </div>

            <h6>Confirm that its you, enter your admin pass:</h6>
            <input type="password" name="adminpass" id="" required />
            <div>
              <button className="login__employee__button">
                Delete Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeEmployee;
