import React from "react";

function AdminHome() {
  return (
    <div className="admin__home apply__home__margin">
      <div className="row">
        <div className="add__employee__container col-lg-6 col-md-12 col-sm-12 ">
          <img
            src="https://www.aesthetic.com/img/homepage/create.svg"
            alt="add emplyee"
            height="200px"
          />
          <h3>Add employee to the portal</h3>
          <h6>Employee can send NFTs update from the portal</h6>
          <button className="add__employee__button">Add Employee</button>
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
  return (
    <div className="admin__employee__container">
      <div className="employee__container">
        <div className="employee_details">
          <div className="employee__details__inner">
            <img
              src="https://www.aesthetic.com/img/homepage/customize.svg"
              alt="employee"
              height="40px"
              className="employee__image"
            />
          </div>
          <div className="employee__name__post">
            <div className="employee__name">Aman</div>
            <div className="employee__post">Software developer</div>
          </div>
        </div>
        <div className="">
          <button className="edit_employee__button">Edit Details</button>
        </div>
        <div>
          <button className="delete__employee__button">Free Employee</button>
        </div>
      </div>
    </div>
  );
}
