import React, { Component } from "react";
import { Toast, Container, Row, Button, Form } from "react-bootstrap";
import RedHeart from '../../../icons8-redheart-48.png'
// import BlankHeart from '../../icons8-blankheart-48.png'

class GetPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],

      //Temporary
      URL: "https://socialnetworklite.herokuapp.com",
      username: JSON.parse(sessionStorage.getItem('username')),
      likeID: null,
      liked: false
    };

    this.addLike=this.addLike.bind(this)
  }
  handleLikeChange(event){this.setState({likeID: event.target.value})}

  //like a post
  addLike(id){

    let userToken = JSON.parse(sessionStorage.getItem('token'))

    fetch(`${this.state.URL}/likes`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `bearer ${userToken}`
    },
    body: JSON.stringify({postId: id})
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
  }).catch(error => console.log(error))
  }

  removeLike(){}

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
        console.log('posts', data)
        this.setState({
          posts: data.posts,
        });

        console.log('checking username',JSON.parse(sessionStorage.getItem('username')));
      });
  }
  render() {
    
    const allPosts = this.state.posts.map((element, index) => {
      return (
        <div className="m-4" key={index} data-id={element.id}> 
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
          

          <Button style={{backgroundColor: "inherit", border:"none"}}type="submit" value="submit" onClick={() => this.addLike(element.id)}>
          </Button>

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
