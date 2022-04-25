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
          Users
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
