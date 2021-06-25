import React, { Component } from "react";
import GetPosts from "./GetPosts/GetPosts";
import Navigation from "../Navigation/Navigation";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap/";
import ViewAllUsers from "./ViewAllUsers/ViewAllUsers";
// import Login from "../Authentication/Login/Login";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      //temp value until passed into props
      URL: "https://socialnetworklite.herokuapp.com",
      username: JSON.parse(sessionStorage.getItem("username")),
      displayName: JSON.parse(sessionStorage.getItem("displayName")),
    };

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  //change state value
  handleMessageChange(event) {
    this.setState({ text: event.target.value });
  }

  //post request to submit posts
  createPost(event) {
    event.preventDefault();

    const userToken = JSON.parse(sessionStorage.getItem("token"));

    fetch(`${this.state.URL}/posts`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `bearer ${userToken}`,
      }),
      body: JSON.stringify({ text: this.state.text }),
    })
      .then((response) => response.json())
      .then((data) => {
        //data goes here
        console.log("Post Request for Posts", data);
        console.log(userToken);
        //emptys out input box
        this.setState({ text: "" });
      })
      .catch((error) => console.log(error));
  }

  //checking if Posts is in database
  //with automatic get request to console.log
  componentDidMount() {
    const userToken = sessionStorage.getItem("token");

    fetch(`${this.state.URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${userToken}`,
      },
    });

    fetch(`${this.state.URL}/users/${this.state.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //both do the same thing
        sessionStorage.setItem(
          "displayName",
          JSON.stringify(data.user.displayName)
        );
        this.setState({ displayName: data.user.displayName });
      });
  }

  render() {
    let mauve = {
      width: "50%",
      height: "50px",
      border: "1px white solid",
      backgroundColor: "#9A6A5C",
      color: "white"
    };

    let cardHeaders = {
      backgroundColor: "#9A6A5C",
      color: "white",
      fontFamily: "benne, serif",
      fontSize: "20px"
    }

    let textAreaField = {
      height: "100px",
      border: "2px #9A6A5C solid",
    };

    let colPadding = {
      paddingTop: "7%",
    };
    let headingFont = {
      fontFamily: 'Nunito, sans-serif',

    };

    let createPostPadding= {
        paddingTop: "7%"
    }

    let mauveBorder ={
        border: "2px #9A6A5C solid "
    }

    return (
      <div>
        <Navigation />

        <div>
          <h1 className="text-center pt-4" style={headingFont}>
            {" "}
            Welcome {this.state.displayName}
          </h1>
          <Container>
            <Row>
              <Col style={createPostPadding} className="flex-direction-column" sm={8}>
                <form onSubmit={this.createPost}>
                <Card  className="text-center" style={mauveBorder}>
                <Card.Header style={cardHeaders}>
                  <Form.Label controlid={this.state.text}>
                    
                    Create a Post
                  </Form.Label>
                  </Card.Header>
                  <Card.Body>
                  <Form.Control
                    size="lg"
                    as="textarea"
                    placeholder="Whats the tea?"
                    style={textAreaField}
                    onChange={this.handleMessageChange}
                    name={this.state.text}
                    value={this.state.text}
                  />
                  </Card.Body>
                  <div className="p-2 text-center">
                    <Button variant={"#9A6A5C"} style={mauve} value="submit" type="submit">
                      Spill it
                    </Button>
                  </div>
                  </Card>
                </form>

                <Col className="mt-5">
                  <GetPosts />
                </Col>
              </Col>
              <Col className={"overflow-auto text-center"} style={colPadding}>
                {/* <h1 style={postAndUsersFont}> View Users </h1> */}
                <ViewAllUsers />
              </Col>
            </Row>
          </Container>
        </div>

        <div></div>
      </div>
    );
  }
}

export default Dashboard;
