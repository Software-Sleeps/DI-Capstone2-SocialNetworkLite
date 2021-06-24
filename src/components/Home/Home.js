import React, { Component } from "react";
import "./Home.css";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import Phone from '../../phone.png'
import Logo from '../../Logo.png'
class Home extends Component {
  render() {
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
                <Button className="button1">Create Account</Button>
                <Button>Login</Button>
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
