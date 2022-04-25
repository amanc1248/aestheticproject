import React, { useState } from "react";
import PopularNFTs from "./PopularNFTs";
import RecentlySold from "./RecentlySold";

function EmployeeUsers() {
  const [popularNFTs, setPopularNFTs] = useState(false);
  const [recentlySold, setRecentlySold] = useState(false);
  const showPopularNFTs = () => {
    setPopularNFTs(true);
  };
  const showRecentlySold = () => {
    setRecentlySold(true);
  };
  return (
    <div>
      {" "}
      <div className="admin__employee__container">
        {popularNFTs && (
          <PopularNFTs setPopularNFTs={setPopularNFTs}></PopularNFTs>
        )}
        {recentlySold && (
          <RecentlySold setRecentlySold={setRecentlySold}></RecentlySold>
        )}
        <div className="employee__container">
          <div className="employee_details">
            <div className="employee__name__post">
              <div className="employee__name">Aman</div>
            </div>
          </div>
          <div className="">
            <div>
              <button
                className="edit_employee__button"
                onClick={showPopularNFTs}
              >
                Send Most Popular NFTs of this week.
              </button>{" "}
            </div>
            <br />
            <div>
              <button
                className="delete__employee__button"
                onClick={showRecentlySold}
              >
                Send recently sold NFTs of this week.
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeUsers;
