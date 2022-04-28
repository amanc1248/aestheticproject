import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  adminAddEmployeeAction,
  adminAddEmployeeClear,
} from "../../actions/adminActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
function AddEmployee({ setAddEmployee }) {
  const dispatch = useDispatch();
  const closeAddEmployee = () => {
    dispatch(adminAddEmployeeClear());
    setAddEmployee(false);
  };

  // states
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [designation, setDesignation] = useState();

  // handlers
  const addEmployeeHandler = (e) => {
    e.preventDefault();
    if (name && email && password && designation) {
      console.log("addEmployeeHandler ran");
      dispatch(adminAddEmployeeAction({ name, email, password, designation }));
    }
  };

  // use selectors
  const { loading, addEmployee, error } = useSelector(
    (state) => state.adminAddEmployeeReducer
  );
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
                username<span style={{ color: "red" }}>Will Autogenerate</span>
              </label>
              <br />
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
            {!loading && (
              <div>
                {!addEmployee && (
                  <button
                    className="login__employee__button"
                    type="submit"
                    onClick={addEmployeeHandler}
                    disabled={addEmployee === "success" && true}
                  >
                    Add Employee
                  </button>
                )}
              </div>
            )}
            {loading && <Loader></Loader>}
            {addEmployee === "success" && (
              <Message>
                {
                  "Employee Added successfully. You can see employee username and password in your employee list"
                }
              </Message>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
