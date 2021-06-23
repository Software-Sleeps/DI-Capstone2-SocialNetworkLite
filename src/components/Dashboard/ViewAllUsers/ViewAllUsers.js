import React, { Component } from "react";
import {Card, Button} from 'react-bootstrap'
import { withRouter } from "react-router-dom";

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
    fetch(`${this.state.URL}/users?limit=10&offset=0`, {
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

    const getAllUsers = this.state.allUsers.map((element) => {
      return (
        <div className="pt-4">
        <Card className="text-center">
        <Card.Header>{element.username}</Card.Header>
        <Card.Body>
          <Card.Title>{element.displayName}</Card.Title>
          <Card.Text>
          {element.about === "" ? (<p>No about yet</p>) : 
        (<p>{element.about}</p>)}          
        </Card.Text>

          <Button variant={mauveButton} style={mauveButton}>Check Posts</Button>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
      </div>
      );
    });
    return <div>{getAllUsers}</div>;
  }
}

export default ViewAllUsers;
