import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  employeeFetchUsersAction,
  employeeFetchUsersClean,
} from "../../actions/employeeActions";
import { useNavigate } from "react-router-dom";
import NewlyMintedNFTs from "./NewlyMintedNFTs";
import LoaderMain from "../../components/LoaderMain";
function EmployeeUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // states

  const [popularNFTs, setPopularNFTs] = useState(false);
  const [recentlySold, setRecentlySold] = useState(false);
  const [newMinted, setNewMinted] = useState(false);
  const [oldestNFTs, setOldestNFTs] = useState(false);
  const showPopularNFTs = () => {
    setPopularNFTs(true);
  };
  const showRecentlySold = () => {
    setRecentlySold(true);
  };
  const showNewlyMinted = () => {
    setNewMinted(true);
  };
  const showOldestNFTs = () => {
    setOldestNFTs(true);
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
      navigate("/auth/false/notLoggedIn");
    }
  }, [fetchedUsers, navigate]);

  return (
    <>
      {loading ? (
        <LoaderMain></LoaderMain>
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
          {fetchedUsers.length !== 0 &&
            fetchedUsers.map((user) => {
              return (
                <div key={user.id}>
                  {" "}
                  <div className="admin__employee__container">
                    {oldestNFTs && (
                      <NewlyMintedNFTs
                        closeFnc={setOldestNFTs}
                        user={user}
                        type="oldestNFTs"
                      ></NewlyMintedNFTs>
                    )}

                    {newMinted && (
                      <NewlyMintedNFTs
                        closeFnc={setNewMinted}
                        user={user}
                        type="newlyMinted"
                      ></NewlyMintedNFTs>
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
                            onClick={showOldestNFTs}
                          >
                            Send some Oldest NFTs from Opensea.
                          </button>{" "}
                        </div>

                        <br />
                        <div>
                          <button
                            className="edit_employee__button"
                            onClick={showNewlyMinted}
                          >
                            Send Newly Minted NFTs.
                          </button>{" "}
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
