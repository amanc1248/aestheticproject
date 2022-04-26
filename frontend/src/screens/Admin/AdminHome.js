import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import FreeEmployee from "./FreeEmployee";
import Loader from "../../components/Loader";
import { adminFetchEmployeeAction } from "../../actions/adminActions";

function AdminHome() {
  const [addEmployee, setAddEmployee] = useState(false);
  const showAddEmployee = () => {
    setAddEmployee(true);
  };

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
  const dispatch = useDispatch();
  // for edit
  const [editEmployee, setEditEmployee] = useState(false);
  const showEditEmployee = () => {
    setEditEmployee(true);
  };

  // for free employee
  const [freeEmployee, setFreeEmployee] = useState(false);
  const showFreeEmployee = () => {
    setFreeEmployee(true);
  };

  // fetching employees
  const { adminEmployees, loading } = useSelector(
    (state) => state.adminFetchEmployeeReducer
  );
  useEffect(() => {
    dispatch(adminFetchEmployeeAction());
  }, [dispatch]);

  console.log("Fetching employees");
  console.log(adminEmployees);
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <>
          {adminEmployees &&
            adminEmployees.map((employee) => {
              return (
                <div className="admin__employee__container">
                  {editEmployee && (
                    <EditEmployee
                      setEditEmployee={setEditEmployee}
                    ></EditEmployee>
                  )}
                  {freeEmployee && (
                    <FreeEmployee
                      setFreeEmployee={setFreeEmployee}
                    ></FreeEmployee>
                  )}
                  <div className="employee__container">
                    <div className="employee_details">
                      <div className="employee__details__inner"></div>
                      <div className="employee__name__post">
                        <div className="employee__name">{employee.name}</div>
                        <div className="employee__post">
                          {employee.designation}
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <button
                        className="edit_employee__button"
                        onClick={showEditEmployee}
                      >
                        Edit Details
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
            })}
        </>
      )}
    </>
  );
}
