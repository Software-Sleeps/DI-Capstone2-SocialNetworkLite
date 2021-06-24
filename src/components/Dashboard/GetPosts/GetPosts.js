import React, { Component } from "react";
import { Toast, Container, Row } from "react-bootstrap";
class GetPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],

      //Temporary
      URL: "https://socialnetworklite.herokuapp.com",
      username: JSON.parse(sessionStorage.getItem('username'))
    };
  }

  componentDidMount() {
    const userToken = JSON.parse(sessionStorage.getItem("token"));

    fetch(`${this.state.URL}/posts?limit=5`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${userToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          posts: data.posts,
        });

        console.log('checking username',JSON.parse(sessionStorage.getItem('username')));
      });
  }
  render() {
    
    const allPosts = this.state.posts.map((element, index) => {
      return (
        <div className="m-4">
          <Container>
            <Row>
          <Toast>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <strong className="mr-auto">{element.username}</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body class="m-5">
              <p key={`${element.text}-${index}`}>{element.text}</p>
            </Toast.Body>
          </Toast>
          </Row>
          </Container>
        </div>
      );
    });
    return (
      <div>
        <div className="m-5">{allPosts}</div>
        {/* <h1>This is GET post</h1> */}
      </div>
    );
  }
}

export default GetPosts;
