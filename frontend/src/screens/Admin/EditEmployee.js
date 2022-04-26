import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { adminEditEmployeeAction } from "../../actions/adminActions";
function EditEmployee({ setEditEmployee, employee }) {
  const dispatch = useDispatch();
  const closeEditEmployee = () => {
    setEditEmployee(false);
  };

  // employee details states
  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [username, setUsername] = useState(employee.username);
  const [designation, setDesignation] = useState(employee.designation);

  // edit employee handler
  const editEmployeeHandler = (e) => {
    e.preventDefault();
    if (name && email && username && designation) {
      dispatch(
        adminEditEmployeeAction({
          id: employee.id,
          name,
          email,
          username,
          designation,
        })
      );
    }
  };
  return (
    <div>
      <div>
        <div className="home__admin__login">
          <div className="employee__add__container">
            <div className="title__and__close">
              <div className="admin__login__title">Edit Employee Details</div>
              <div className="close__icon">
                <CloseIcon onClick={closeEditEmployee}></CloseIcon>
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
                value={name}
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
                value={email}
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
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
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
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
              />
            </div>
            <div>
              <button
                className="login__employee__button"
                onClick={editEmployeeHandler}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
