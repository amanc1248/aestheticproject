import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import FreeEmployee from "./FreeEmployee";
import Loader from "../../components/Loader";
import {
  adminAddEmployeeClear,
  adminChangeEmployeePasswordActionCleanError,
  adminDeleteEmployeeClean,
  adminEditEmployeeAction,
  adminEditEmployeeClean,
  adminFetchEmployeeAction,
  adminFetchEmployeeCleanAction,
  adminLoginClean,
} from "../../actions/adminActions";
import ChangeEmployeePassword from "./ChangeEmployeePassword";
import RevealUsernameAndPassword from "./RevealUsernameAndPassword";
import { useNavigate, Redirect } from "react-router-dom";
import Message from "../../components/Message";

function AdminHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addEmployee, setAddEmployee] = useState(false);
  const showAddEmployee = () => {
    setAddEmployee(true);
  };
  // USE SELECTOR
  // const { loading, adminEmployees, error } = useSelector(
  //   (state) => state.adminFetchEmployeeReducer
  // );
  // console.log("adminEMployee:", adminEmployees);
  // dispatch(adminLoginClean());

  // useEffects
  // useEffect(() => {
  //   console.log("Use effect RAN.....");

  //   dispatch(adminFetchEmployeeAction());
  // }, []);

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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // usestates
  const [message, setMessage] = useState();

  // useSelectors
  const { adminEmployees, loading } = useSelector(
    (state) => state.adminFetchEmployeeReducer
  );
  const { addEmployee } = useSelector((state) => state.adminAddEmployeeReducer);
  const { editedEmployee } = useSelector(
    (state) => state.adminEditEmployeeReducer
  );
  const { changedPassword } = useSelector(
    (state) => state.adminChangeEmployeePasswordReducer
  );
  const { deletedEmployee } = useSelector(
    (state) => state.adminDeleteEmployeeReducer
  );

  // useEffects

  useEffect(() => {
    dispatch(adminFetchEmployeeAction());
  }, [dispatch]);

  useEffect(() => {
    if (adminEmployees === "unAuthorized") {
      dispatch(adminFetchEmployeeCleanAction());
      navigate("/auth/true/false");
    }
  }, [adminEmployees, navigate, dispatch]);

  useEffect(() => {
    if (addEmployee === "success") {
      dispatch(adminFetchEmployeeAction());
      setMessage("Employee Added Successfully");
    }
    if (editedEmployee === "success") {
      dispatch(adminFetchEmployeeAction());
      setMessage("Employee Edited Successfully");
    }
    if (changedPassword === "success") {
      dispatch(adminFetchEmployeeAction());
      setMessage("Password Changed Successfully");
    }
    if (deletedEmployee === "success") {
      dispatch(adminFetchEmployeeAction());
      setMessage("Deleted Successfully");
    }
  }, [addEmployee, dispatch, editedEmployee, changedPassword, deletedEmployee]);

  useEffect(() => {
    setTimeout(() => {
      setMessage();
      dispatch(adminAddEmployeeClear());
      dispatch(adminChangeEmployeePasswordActionCleanError());
      dispatch(adminDeleteEmployeeClean());
      dispatch(adminLoginClean());
      dispatch(adminEditEmployeeClean());
    }, 5000);
  }, [message]);

  console.log("Here i am running infinie loop");
  console.log(adminEmployees);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : adminEmployees === "no employees" ? (
        <h1>No Employees</h1>
      ) : adminEmployees === "unAuthorized" ? (
        <h1>unAuthorized</h1>
      ) : adminEmployees === undefined ? (
        <h1>undefined</h1>
      ) : adminEmployees === null ? (
        <h1>null</h1>
      ) : (
        <>
          {message && <Message>{message}</Message>}
          {adminEmployees.map((employee) => {
            return (
              <div className="admin__employee__container" key={employee.id}>
                <AdminSingleEmployee employee={employee}></AdminSingleEmployee>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

function AdminSingleEmployee({ employee }) {
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
