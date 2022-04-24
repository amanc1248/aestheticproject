import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/components/Header.css";
import HomeAdminLogin from "../screens/Home/HomeAdminLogin";
import HomeEmployeeLogin from "../screens/Home/HomeEmployeeLogin";
function Header() {
  const [adminLogin, setAdminLogin] = useState(false);
  const showAdminLogin = () => {
    setAdminLogin(true);
  };

  const [employeeLogin, setEmployeeLogin] = useState(false);
  const showEmployeeLogin = () => {
    setEmployeeLogin(true);
  };
  return (
    <div className="apply__home__margin">
      {adminLogin && (
        <HomeAdminLogin setAdminLogin={setAdminLogin}></HomeAdminLogin>
      )}
      {employeeLogin && (
        <HomeEmployeeLogin setAdminLogin={setEmployeeLogin}></HomeEmployeeLogin>
      )}
      <Navbar expand="lg" bg="white" className="the__navbar">
        <Navbar.Brand href="/" className={"navbar__brand"}>
          Aesthetic
        </Navbar.Brand>
        {/* INside the navbar.collapse will be everything which will be collapsed */}
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="text-md-end order-lg-0 order-last"
        >
          <Nav.Link className="the__header__icon ">
            <button className="login__admin__button" onClick={showAdminLogin}>
              Login as admin
            </button>
          </Nav.Link>
          <Nav.Link>
            <button
              className="login__employee__button"
              onClick={showEmployeeLogin}
            >
              Login as employee
            </button>
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
            {/* <i className="fas fa-bars hamburger"></i> */}
            <MenuIcon className="hamburger__icon"></MenuIcon>
          </span>
        </Navbar.Toggle>
      </Navbar>
    </div>
  );
}

export default Header;
