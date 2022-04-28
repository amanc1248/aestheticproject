import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import FreeEmployee from "./FreeEmployee";
import Loader from "../../components/Loader";
import { adminFetchEmployeeAction } from "../../actions/adminActions";
import ChangeEmployeePassword from "./ChangeEmployeePassword";
import RevealUsernameAndPassword from "./RevealUsernameAndPassword";

function AdminHome() {
  const dispatch = useDispatch();

  const [addEmployee, setAddEmployee] = useState(false);
  const showAddEmployee = () => {
    setAddEmployee(true);
  };
  useEffect(() => {
    console.log("Use effect RAN.....");
    dispatch(adminFetchEmployeeAction());
  });

  return (
    <div className="admin__home apply__home__margin">
      {addEmployee && (
        <AddEmployee setAddEmployee={setAddEmployee}></AddEmployee>
      )}

      <div className="row">
        <div className="add__employee__container col-lg-6 col-md-12 col-sm-12 ">
          <img
            src="https://www.aesthetic.com/img/homepage/create.svg"
            alt="add emplyee"
            height="200px"
          />
          <h3>Add employee to the portal</h3>
          <h6>Employee can send NFTs update from the portal</h6>
          <button className="add__employee__button" onClick={showAddEmployee}>
            Add Employee
          </button>
        </div>
        <div className="users__container col-lg-6 col-md-12 col-sm-12">
          <AdminEmployees></AdminEmployees>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;

function AdminEmployees() {
  // fetching employees
  const { adminEmployees, loading } = useSelector(
    (state) => state.adminFetchEmployeeReducer
  );
  console.log("Fetching employees");
  console.log(adminEmployees);
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : adminEmployees === "no employees" ? (
        <h1>No Employees</h1>
      ) : (
        <>
          {adminEmployees &&
            adminEmployees.map((employee) => {
              return (
                <div className="admin__employee__container" key={employee.id}>
                  <AdminSingleEmployee
                    employee={employee}
                  ></AdminSingleEmployee>
                </div>
              );
            })}
        </>
      )}
    </>
  );
}

function AdminSingleEmployee({ employee }) {
  const dispatch = useDispatch();

  // for edit
  const [editEmployee, setEditEmployee] = useState(false);
  const showEditEmployee = () => {
    setEditEmployee(true);
  };

  // for change password
  const [changePassword, setChangePassword] = useState(false);
  const showChangePassword = () => {
    setChangePassword(true);
  };

  // for free employee
  const [freeEmployee, setFreeEmployee] = useState(false);
  const showFreeEmployee = () => {
    setFreeEmployee(true);
  };

  // for reveal username & password
  const [revealUPass, setRevealUPass] = useState(false);
  const showRevealUPass = () => {
    setRevealUPass(true);
  };
  return (
    <div>
      {editEmployee && (
        <EditEmployee
          setEditEmployee={setEditEmployee}
          employee={employee}
        ></EditEmployee>
      )}
      {changePassword && (
        <ChangeEmployeePassword
          setChangePassword={setChangePassword}
          employee={employee}
        ></ChangeEmployeePassword>
      )}
      {freeEmployee && (
        <FreeEmployee
          setFreeEmployee={setFreeEmployee}
          employee={employee}
        ></FreeEmployee>
      )}
      {revealUPass && (
        <RevealUsernameAndPassword
          setRevealUPass={setRevealUPass}
          employee={employee}
        ></RevealUsernameAndPassword>
      )}
      <div className="employee__container">
        <div className="employee_details">
          <div className="employee__details__inner"></div>
          <div className="employee__name__post">
            <div className="employee__name">{employee.name}</div>
            <div className="employee__post">{employee.designation}</div>
          </div>
        </div>
        <div className="">
          <button className="edit_employee__button" onClick={showEditEmployee}>
            Edit Details
          </button>
        </div>
        <div className="">
          <button
            className="edit_employee__button"
            onClick={showChangePassword}
          >
            Change Password
          </button>
        </div>
        <div className="">
          <button className="edit_employee__button" onClick={showRevealUPass}>
            Reveal username & password
          </button>
        </div>
        <div>
          <button
            className="delete__employee__button"
            onClick={showFreeEmployee}
          >
            Free Employee
          </button>
        </div>
      </div>
    </div>
  );
}
