import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function AddEmployee({ setAddEmployee }) {
  const closeAddEmployee = () => {
    setAddEmployee(false);
  };
  return (
    <div>
      <div className="home__admin__login">
        <form action="">
          <div className="employee__add__container">
            <div className="title__and__close">
              <div className="admin__login__title">Add Employee</div>
              <div className="close__icon">
                <CloseIcon onClick={closeAddEmployee}></CloseIcon>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="admin__login__label">
                Name<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input type="text" id="name" required />
            </div>
            <div>
              <label htmlFor="email" className="admin__login__label">
                Email<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input type="email" id="email" required />
            </div>
            <div>
              <label htmlFor="username" className="admin__login__label">
                username<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input type="text" id="username" required />
            </div>
            <div>
              <label htmlFor="password" className="admin__login__label">
                password<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input type="password" id="password" required />
            </div>
            <div>
              <label htmlFor="designation" className="admin__login__label">
                designation<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input type="text" id="designation" required />
            </div>
            <div>
              <button className="login__employee__button" type="submit">
                Add Employee
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
