import { Link } from "react-router-dom";

import React from "react";
import Logout from "../Authentication/Logout/Logout";
import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import "./Navigation.css";

function Navigation(props) {
  //need to add CSS classes in objects
  const styleLink = {
    color: "white",
    textDecoration: "none",
  };

  const accountButton = {
    backgroundColor: "white",
    color: "black",
    border: "#9A6A5C 1px solid",
  };

  const accountLink = {
    color: "#9A6A5C",
  };
  return (
    <div>
      <Navbar bg="mauve" variant="dark">
        <Navbar.Brand></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to="/" style={styleLink}>
              Home
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/dashboard" style={styleLink}>
              Dashboard
            </Link>
          </Nav.Link>
        </Nav>

        <Form inline>
          <Button variant="outline-info" style={accountButton}>
            <Link to="/account" style={accountLink}>
              My Account
            </Link>
          </Button>

          <div className="pl-3"></div>
          <Logout />
        </Form>
      </Navbar>
    </div>
  );
}

export default Navigation;
