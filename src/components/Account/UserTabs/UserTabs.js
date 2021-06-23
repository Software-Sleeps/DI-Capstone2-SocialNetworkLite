import React, { Component } from 'react';
import {Tabs, Tab, Container, Row, Col} from 'react-bootstrap'
import './UserTabs.css'
import User from '../User/User'

class UserTabs extends Component {


    render() {
        return (
            <div>
            <Container fluid>
                <Row className={"justify-content-center"}>
       <Col className={"nav-justified"}>         
<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">


  <Tab eventKey="user" title="User" >
     <User/>
  </Tab>


  <Tab eventKey="aboutMe" title="About Me" >
        <h1>Hello world from about me</h1>
  </Tab>

     <Tab eventKey="posts" title="Posts" >
        <h1>Hello world from posts</h1>

    </Tab>
    
    </Tabs>
    </Col>
        </Row>
            </Container>
            </div>
        );
    }
}

export default UserTabs;