import React, { Component } from "react";
import "./AccountOverview.css";
import testAccount from '../../../icons8-test-account-96.png'
import { Button, Container, Row, Col } from 'react-bootstrap'
class AccountOverview extends Component {
constructor(props){
  super(props)
  this.state = {
    URL: "https://socialnetworklite.herokuapp.com",
    username: JSON.parse(sessionStorage.getItem('username')),
    displayName: JSON.parse(sessionStorage.getItem('displayName')),
    aboutMe: '',
    picture: ''
  }
}
  
componentDidMount(){
  let userToken = JSON.parse(sessionStorage.getItem('token'))
  fetch(`${this.state.URL}/users/${this.state.username}`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${userToken}`
    }})
    .then(response => response.json())
    .then(data => {

      console.log('this is data from get user by ID', data)

      this.setState({
        //displayName: data.user.displayName,
        aboutMe: data.user.about,
        picture: data.user.pictureLocation
      })
    })
}

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
            <h4>{this.state.displayName}</h4>
            <p>{this.state.username}</p>
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
