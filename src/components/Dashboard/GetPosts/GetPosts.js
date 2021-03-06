import React, { Component } from "react";
import { Toast, Button, Card } from "react-bootstrap";

class GetPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],

      //Temporary
      // URL: "https://socialnetworklite.herokuapp.com",
      username: JSON.parse(sessionStorage.getItem("username")),
      likedPosts: [],
      liked: true,
    };
  }
  handleLikeChange(event) {
    this.setState({ likeID: event.target.value });
  }

  //like a post
  addLike = (id) => {
    //let userToken = JSON.parse(sessionStorage.getItem("token"));

    this.setState((currentState) => {
      return { likedPosts: [...currentState.likedPosts, Number(id)] };
    });
    // fetch("https://socialnetworklite.herokuapp.com/likes", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization: `bearer ${userToken}`,
    //   },
    //   body: JSON.stringify({ postId: id }),
    // })
    //.then((response) => response.json())
    // .then((data) => {
    //   console.log(data);
    //   this.setState({ likedPosts: data.likes, liked: true });
    // })
    // .catch((error) => console.log(error));
  };

  removeLike = (id) => {
    this.setState((currentState) => {
      if (currentState.likedPosts.length > 0) {
        const index = currentState.likedPosts.indexOf(id);

        const copy = [...currentState.likedPosts];
        copy.splice(index, 1);

        return { likedPosts: copy };
      }
    });
    // let userToken = JSON.parse(sessionStorage.getItem("token"));
    // fetch(`https://socialnetworklite.herokuapp.com/likes/${id}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization: `bearer ${userToken}`,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     this.setState({ liked: false });
    //   })
    //   .catch((error) => console.log(error));
  }

  getPosts = (userToken = JSON.parse(sessionStorage.getItem("token"))) =>{

    fetch("https://socialnetworklite.herokuapp.com/posts?limit=5", {
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
        });
  }

  componentDidMount() {
    // this.state.posts.forEach((element) =>{
    //     element.likes.forEach(nestedElement => {
    //      this.state.likedPosts.push(nestedElement)
    //     })
    //   })
    // // console.log('these are the liked posts', this.state.likedPosts)
    // const userToken = JSON.parse(sessionStorage.getItem("token"));
    //
    // fetch("https://socialnetworklite.herokuapp.com/posts?limit=5", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `bearer ${userToken}`,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     this.setState({
    //       posts: data.posts,
    //     });
    //   });
    this.getPosts()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('prev state', prevState)

    if (prevState.posts.length !== this.state.posts.length){
      this.getPosts()
      }
    }

  render() {
    //header colors
    let cardHeader = {
      backgroundColor: "#9A6A5C",
      color: "white",
      fontFamily: "benne, serif",
      fontSize: "22px",
    };

    //all cards
    const allPosts = this.state.posts.map((element, index) => {
      //if the posts than show a certain button
      //if post is not liked show a different button

      let button =
        this.state.likedPosts.indexOf(element.id) >= 0 ? (
          <Button
            style={{ backgroundColor: "#9A6A5C", border: "none" }}
            type="submit"
            value="submit"
            onClick={() => this.removeLike(element.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-suit-heart"
              viewBox="0 0 16 16"
            >
              <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
            </svg>
          </Button>
        ) : (
          <Button
            style={{ backgroundColor: "#9A6A5C", border: "none" }}
            type="submit"
            value="submit"
            onClick={() => this.addLike(element.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-suit-heart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
            </svg>
          </Button>
        );
      //will cut off time stamp
      let findCutoff = element.createdAt.indexOf("T");
      let dateCreated = element.createdAt.slice(0, findCutoff);

      return (
        <div
          className="m-4 text-center"
          key={index}
          data-id={element.id}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Toast>
            <Toast.Header>
              <strong className="mr-auto">{element.username}</strong>
              <small>{dateCreated}</small>
            </Toast.Header>
            <Toast.Body className="m-5">
              <p key={`${element.text}-${index}`}>{element.text}</p>
            </Toast.Body>

            {button}
          </Toast>
        </div>
      );
    });

    let fixedHeight = {
      height: "735px",
      overflowY: "auto",
    };

    let mauveBorder = {
      border: "2px #9A6A5C solid ",
    };
    return (
      <div>
        <Card style={mauveBorder}>
          <Card.Header className="text-center" style={cardHeader}>
            What's Happening?
          </Card.Header>
          <Card.Body style={fixedHeight}>{allPosts}</Card.Body>
        </Card>
        {/* <h1>This is GET post</h1> */}
      </div>
    );
  }
}

export default GetPosts;
