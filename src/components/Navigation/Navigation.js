import { Link } from "react-router-dom";

import React from 'react';
import Logout from "../Authentication/Logout/Logout";
import { Navbar, Nav, Form, Button, FormControl, NavDropdown } from "react-bootstrap";
import './Navigation.css'

function Navigation(props){

    //need to add CSS classes in objects
    const styleLink = {
        color: "white",
        textDecoration: "none"
    }

    const searchButton = {
        backgroundColor: "inherit",
        color: "white",
        border: "white 1px solid",
        //trying to add a CSS hover attribute
        "&:hover": {
            backgroundColor: 'black',
            color: "black"
        }
    }
        return (
            <div>

<Navbar bg="mauve" variant="dark">
    <Navbar.Brand></Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link><Link to="/" style={styleLink}>Home</Link></Nav.Link>
      <Nav.Link><Link to="/dashboard" style={styleLink}>Dashboard</Link></Nav.Link>
      
        {/* DROPDOWN */}
      <NavDropdown title="View" id="navbarScrollingDropdown">
        <NavDropdown.Item><Link to="/account">View Account</Link></NavDropdown.Item>
        <NavDropdown.Divider />

        <NavDropdown.Item>
            
            {/* add logout component here */}
            {/* Logout */}
            <Logout/>
            
        </NavDropdown.Item>

      </NavDropdown>

        {/* DROPDOWN */}

    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search Users" className="mr-sm-2" />
      <Button variant="outline-info" style={searchButton}>Search</Button>
    </Form>
  </Navbar>

            </div>
        );
}

export default Navigation;