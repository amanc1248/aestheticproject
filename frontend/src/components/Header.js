import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import MenuIcon from "@mui/icons-material/Menu";
import "../styles/components/Header.css";
function Header() {
  return (
    <div className="apply__home__margin">
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
            <button className="login__admin__button">Login as admin</button>
          </Nav.Link>
          <Nav.Link>
            <button className="login__employee__button">
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
