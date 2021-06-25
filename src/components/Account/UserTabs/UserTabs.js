import React, { Component } from 'react';
import {Tabs, Tab, Container, Row, Col} from 'react-bootstrap'
import './UserTabs.css'
import User from '../User/User'
import AboutMe from '../AboutMe/AboutMe';
import Posts from '../Posts/Posts'

class UserTabs extends Component {


    render() {
        let tabColor = {
            color: "#9A6A5C"
          };
        
        return (
            <div>
            <Container fluid>
                <Row className={"justify-content-center"}>
       <Col className={"nav-justified"}>         
<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">


  <Tab eventKey="user" title="User">
     <User/>
  </Tab>


  <Tab eventKey="aboutMe" title="About Me" >
            <AboutMe/>
  </Tab>

     <Tab eventKey="posts" title="My Posts" >
        <Posts/>
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