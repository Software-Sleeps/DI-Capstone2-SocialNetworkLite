import React, { Component } from "react";
import { Card, Button, Image } from "react-bootstrap";
import testAccount from "../../../icons8-test-account-96.png";

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
        this.setState({ allUsers: data.users });
      });
  }
  render() {
    let mauveButton = {
      backgroundColor: "#9A6A5C",
      color: "white",
    };

    const getAllUsers = this.state.allUsers.map((element, index) => {
      //compute time

      let findCutoff = element.createdAt.indexOf("T");
      let dateCreated = element.createdAt.slice(0, findCutoff);

      return (
        <div className="pt-4">
          <Card className="text-center">
            <Card.Header key={`${element.username}-${index}`}>
              {element.username}
            </Card.Header>
            <Card.Body>
              <div>
                {element.pictureLocation === null ? (
                  <Image src={testAccount} roundedCircle />
                ) : (
                  <Image
                    src={element.pictureLocation}
                    roundedCircle
                    key={`${element.pictureLocation}-${index}`}
                  />
                )}

                <Card.Title key={`${element.displayName}-${index}`}>
                  {element.displayName}
                </Card.Title>
                <Card.Text>
                  {element.about === "" ? (
                    <p>No about yet</p>
                  ) : (
                    <p key={`${element.about}-${index}`}>{element.about}</p>
                  )}
                </Card.Text>

                <Button variant={mauveButton} style={mauveButton}>
                  Check Posts
                </Button>
              </div>
            </Card.Body>
            <Card.Footer className="text-muted">
              Member Since {dateCreated}
            </Card.Footer>
          </Card>
        </div>
      );
    });

    let containerStyle = {
      overflowY: "auto",
      height: "1059px",
    };

    let cardHeader = {
      backgroundColor: "#9A6A5C",
      color: "white",
      fontFamily: "Benne, serif",
      fontSize: "22px",
    };

    let mauveBorder = {
      border: "2px #9A6A5C solid ",
    };

    return (
      <div className="overflow-auto">
        <Card style={mauveBorder}>
          <Card.Header style={cardHeader} className="benne">
            View Users
          </Card.Header>
          <Card.Body style={containerStyle}>{getAllUsers}</Card.Body>
        </Card>
      </div>
    );
  }
}

export default ViewAllUsers;
