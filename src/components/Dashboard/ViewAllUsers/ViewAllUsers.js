import React, { Component } from "react";
import {Card, Button, Image, Container} from 'react-bootstrap'
import testAccount from '../../../icons8-test-account-96.png'

// import { withRouter } from "react-router-dom";

class ViewAllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      URL: "https://socialnetworklite.herokuapp.com",
    };
  }

  // Automatic GET request
  componentDidMount() {
    let userToken = JSON.parse(sessionStorage.getItem("token"));
    fetch(`${this.state.URL}/users?limit=100&offset=0`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("GET resquest for all users", data, typeof data);
        this.setState({ allUsers: data.users });
      });
  }
  render() {
    let mauveButton = {
      backgroundColor: "#9A6A5C",
      color: "white"
    }

    const getAllUsers = this.state.allUsers.map((element, index) => {
      return (
        <div className="pt-4">
         
        <Card className="text-center">
        <Card.Header key={`${element.username}-${index}`}>{element.username}</Card.Header>
        <Card.Body>
          <div>
          {
            element.pictureLocation === null ? (
              <Image src={testAccount} roundedCircle />
            ) : (
          <Image src={element.pictureLocation} roundedCircle key={`${element.pictureLocation}-${index}`}/>
            )
          }

          <Card.Title key={`${element.displayName}-${index}`}>{element.displayName}</Card.Title>
          <Card.Text>
          {element.about === "" ? (<p>No about yet</p>) : 
        (<p key={`${element.about}-${index}`}>{element.about}</p>)}   
        </Card.Text>

          <Button variant={mauveButton} style={mauveButton}>Check Posts</Button>
          </div>       

        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
      </div>
      );
    });

    let containerStyle = {
      overflowY: "auto",
      height: "1000px"
    }

    let fixedHeight = {
      height: "200px"
    }

    let cardHeader = {
      backgroundColor: "#9A6A5C",
      color: "white",
      fontFamily: "Nunito, sans-serif",
    }
    
    return <div className="overflow-auto">
      {/* <Container style={containerStyle} className="overflow-auto"> */}
      <Card >
  <Card.Header style={cardHeader}>View Users</Card.Header>
  <Card.Body style={containerStyle}>{getAllUsers}</Card.Body>
      
      
      </Card>

      {/* </Container> */}
      </div>;
  }
}

export default ViewAllUsers;
