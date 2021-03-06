import React, { Component } from "react";
import { Card, CardColumns } from "react-bootstrap";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: JSON.parse(sessionStorage.getItem("username")),
      userPosts: [],
      URL: "https://socialnetworklite.herokuapp.com",
    };
  }

  componentDidMount() {
    let userToken = JSON.parse(sessionStorage.getItem("token"));

    fetch(`${this.state.URL}/posts?username=${this.state.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          userPosts: data.posts,
        });
      });
  }

  render() {
    let allUserPosts = this.state.userPosts.map((element, index) => {
      let findCutoff = element.createdAt.indexOf("T");
      let dateCreated = element.createdAt.slice(0, findCutoff);
      return (
        <Card className="text-center">
          <Card.Body>
            <Card.Title>{element.username}</Card.Title>
            <Card.Text>{element.text} </Card.Text>
            <Card.Text>
              <small className="text-muted">Posted on {dateCreated}</small>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    });
    return (
      <div className="p-5">
        <CardColumns>{allUserPosts}</CardColumns>
      </div>
    );
  }
}

export default Posts;
