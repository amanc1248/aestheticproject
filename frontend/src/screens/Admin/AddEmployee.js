import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function AddEmployee({ setAddEmployee }) {
  const closeAddEmployee = () => {
    setAddEmployee(false);
  };
  return (
    <div>
      <div className="home__admin__login">
        <div className="employee__add__container">
          <div className="title__and__close">
            <div className="admin__login__title">Add Employee</div>
            <div className="close__icon">
              <CloseIcon onClick={closeAddEmployee}></CloseIcon>
            </div>
          </div>

          <div>
            <label htmlFor="admin__login" className="admin__login__label">
              Name<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <input type="text" id="admin__login" required />
          </div>
          <div>
            <label htmlFor="admin__login" className="admin__login__label">
              Email<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <input type="text" id="admin__login" required />
          </div>
          <div>
            <label htmlFor="admin__login" className="admin__login__label">
              username<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <input type="text" id="admin__login" required />
          </div>
          <div>
            <label htmlFor="admin__login" className="admin__login__label">
              password<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <input type="password" id="admin__login" required />
          </div>
          <div>
            <label htmlFor="admin__login" className="admin__login__label">
              designation<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <input type="text" id="admin__login" required />
          </div>
          <div>
            <button className="login__employee__button">Add Employee</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
