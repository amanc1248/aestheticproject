import React from "react";

function EmployeeUsers() {
  return (
    <div>
      {" "}
      <div className="admin__employee__container">
        {/* {editEmployee && (
          <EditEmployee setEditEmployee={setEditEmployee}></EditEmployee>
        )}
        {freeEmployee && (
          <FreeEmployee setFreeEmployee={setFreeEmployee}></FreeEmployee>
        )} */}
        <div className="employee__container">
          <div className="employee_details">
            <div className="employee__name__post">
              <div className="employee__name">Aman</div>
            </div>
          </div>
          <div className="">
            <button
              className="edit_employee__button"
              //   onClick={showEditEmployee}
            >
              Send Most Popular NFTs of this week.
            </button>
          </div>
          <div>
            <button
              className="delete__employee__button"
              //   onClick={showFreeEmployee}
            >
              Send recently sold NFTs of this week.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeUsers;
