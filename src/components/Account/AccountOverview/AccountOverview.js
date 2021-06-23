import React, { Component } from "react";
import "./AccountOverview.css";
import testAccount from '../../../icons8-test-account-96.png'
import { Button, Container, Row, Col } from 'react-bootstrap'
class AccountOverview extends Component {

  

  render() {
    let adjustButtons = {
        width: "30%",
        height: "30%"
    }

    return (
      <div className=" text-center p-input">
        <Container fluid>
          {/*  PIC & USERNAME */}
          <Row>
          <Col>
            <img src={testAccount} alt=""/>
            <h4>Test Account</h4>
            <p>Username</p>
            </Col>
          {/* PIC & USERNAME */}

          {/* Update Pic & Delete User Buttons */}
          
          <Col>
            <div className="p-4"><Button style={adjustButtons}>Update Picture</Button></div>
            <div className="p-4"><Button style={adjustButtons}>Delete User</Button></div>
          </Col>

          {/* Update Pic & Delete User Buttons */}
          </Row>
          </Container>
        </div>
    );
  }
}

export default AccountOverview;
