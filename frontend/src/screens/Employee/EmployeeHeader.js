import React, { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import MenuIcon from "@mui/icons-material/Menu";
import "../../styles/screens/Admin.css";
import EmployeeProfile from "./EmployeeProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  employeeByIdAction,
  employeeByIdClean,
} from "../../actions/employeeActions";
import { useNavigate } from "react-router-dom";

function EmployeeHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [employeeProfile, setEmployeeProfile] = useState(false);

  // handlers
  const showEmployeeProfile = () => {
    setEmployeeProfile(true);
  };

  // useSelectors
  const { employeeById } = useSelector((state) => state.employeeByIdReducer);

  // useEffect
  useEffect(() => {
    dispatch(employeeByIdAction());
  }, [dispatch]);

  useEffect(() => {
    if (employeeById === "unAuthorized") {
      navigate("/auth/false/notLoggedIn");
    }
  }, []);

  return (
    <div>
      {employeeProfile && (
        <EmployeeProfile
          setEmployeeProfile={setEmployeeProfile}
          employee={employeeById}
        ></EmployeeProfile>
      )}
      <Navbar expand="lg" bg="white" className="the__navbar">
        <div>
          <Navbar.Brand href="/employee">
            <div className="admin__brand__container">
              <div className="admin__brand">A</div>
              <div className="admin__brand__name">
                {employeeById && employeeById.name} <br />
                Employee
              </div>
            </div>
          </Navbar.Brand>
        </div>
        {/* INside the navbar.collapse will be everything which will be collapsed */}
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="order-lg-0 order-last"
        >
          <Nav.Link className="admin__header__icons first__header__link second__header__link">
            {/* <WorkIcon></WorkIcon> */}
            🥰 Users
          </Nav.Link>

          <Nav.Link>
            <img
              src="https://res.cloudinary.com/proudposhak-com/image/upload/v1650865920/aestheticproject/profile_image_3_c1jhqc.jpg"
              alt="profile"
              className="profile__image"
              onClick={showEmployeeProfile}
            />
          </Nav.Link>
        </Navbar.Collapse>

        <Navbar.Toggle
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="">
            <MenuIcon className="hamburger__icon"></MenuIcon>
          </span>
        </Navbar.Toggle>
      </Navbar>
    </div>
  );
}

export default EmployeeHeader;
