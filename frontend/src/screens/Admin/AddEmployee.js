import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { adminAddEmployeeAction } from "../../actions/adminActions";
function AddEmployee({ setAddEmployee }) {
  const dispatch = useDispatch();
  const closeAddEmployee = () => {
    setAddEmployee(false);
  };

  // states
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [designation, setDesignation] = useState();

  const addEmployeeHandler = (e) => {
    e.preventDefault();
    if (name && email && username && password && designation) {
      console.log("addEmployeeHandler ran");
      dispatch(
        adminAddEmployeeAction({ name, email, username, password, designation })
      );
    }
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
              <input
                type="text"
                id="name"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="email" className="admin__login__label">
                Email<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="email"
                id="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="username" className="admin__login__label">
                username<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="text"
                id="username"
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="admin__login__label">
                password<span style={{ color: "red" }}>*</span>
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
              <label htmlFor="designation" className="admin__login__label">
                designation<span style={{ color: "red" }}>*</span>
              </label>
              <br />
              <input
                type="text"
                id="designation"
                required
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
              />
            </div>
            <div>
              <button
                className="login__employee__button"
                type="submit"
                onClick={addEmployeeHandler}
              >
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
