import React, { Component } from "react";
import "./Home.css";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import Phone from '../../phone.png'
import Logo from '../../Logo.png'
import {Link} from 'react-router-dom'
class Home extends Component {
    render() {
        let createBtn = {
            backgroundColor: "white",
            color: "black",
            border:"none"
    
        }
         let loginBtn = {
           backgroundColor: "inherit",
           color: "white",
           border: "white 1px solid"
         };
        let linkTwo = {
          textDecoration: "none",
          color: "white",
        };
        
         let link = {
             textDecoration: "none",
             color:"black"
         };
      return (
        <div className="HomePage">
          <Container fluid>
            <Row md={2}>
              <Col sm={10}>
                <div className="text-center col1">
                  <Image src={Logo} alt={"Logo"} />
                </div>
                <h1 className="title" style={{ textAlign: "end" }}>
                  {" "}
                  Platform for Connection
                </h1>
                <div className="text-center head1">
                  <h7 className="title">
                    A thoughtful combination of connecting and talking while
                    creating meaningful content for all users around the world
                  </h7>
                </div>
                <Button style={createBtn} className="button1">
                  {" "}
                  <Link style={link} to="/login">
                    {" "}
                    Create Account{" "}
                  </Link>
                </Button>
                <Button style={loginBtn}>
                  <Link style={linkTwo}  to="/login">
                    {" "}
                    Login{" "}
                  </Link>
                </Button>
              </Col>

              <Col xs={4} className="p-5">
                <Image src={Phone} alt={"Icon"} />
              </Col>
            </Row>
          </Container>
        </div>
      );
  }
}
export default Home;
