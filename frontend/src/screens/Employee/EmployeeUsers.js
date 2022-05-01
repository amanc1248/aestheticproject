import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  employeeFetchUsersAction,
  employeeFetchUsersClean,
  employeeLoginClean,
} from "../../actions/employeeActions";
import PopularNFTs from "./PopularNFTs";
import RecentlySold from "./RecentlySold";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
function EmployeeUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // states
  const [popularNFTs, setPopularNFTs] = useState(false);
  const [recentlySold, setRecentlySold] = useState(false);
  const showPopularNFTs = () => {
    setPopularNFTs(true);
  };
  const showRecentlySold = () => {
    setRecentlySold(true);
  };

  // useSelectors
  const { loading, fetchedUsers } = useSelector(
    (state) => state.employeeFetchUsersReducer
  );

  // useEffects
  useEffect(() => {
    dispatch(employeeFetchUsersAction());
  }, [dispatch]);

  useEffect(() => {
    if (fetchedUsers === "unAuthorized") {
      // dispatch(employeeFetchUsersClean());
      navigate("/auth/false/true");
    }
  }, [fetchedUsers, navigate, dispatch]);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : fetchedUsers === "no users" ? (
        <h1>No Users</h1>
      ) : fetchedUsers === "unAuthorized" ? (
        <h1>unAuthorized</h1>
      ) : fetchedUsers === undefined ? (
        <h1>undefined</h1>
      ) : fetchedUsers === null ? (
        <h1>null</h1>
      ) : (
        <>
          {fetchedUsers.map((user) => {
            return (
              <div key={user.id}>
                {" "}
                <div className="admin__employee__container">
                  {popularNFTs && (
                    <PopularNFTs setPopularNFTs={setPopularNFTs}></PopularNFTs>
                  )}
                  {recentlySold && (
                    <RecentlySold
                      setRecentlySold={setRecentlySold}
                    ></RecentlySold>
                  )}
                  <div className="employee__container">
                    <div className="employee_details">
                      <div className="employee__name__post">
                        <div className="employee__name">{user.name}</div>
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
          })}
        </>
      )}
    </>
  );
}

export default EmployeeUsers;
