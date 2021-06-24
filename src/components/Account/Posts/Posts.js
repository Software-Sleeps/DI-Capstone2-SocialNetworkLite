import React, { Component } from 'react';
import {Card, CardColumns } from 'react-bootstrap'


class Posts extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: JSON.parse(sessionStorage.getItem('username')),
      userPosts: [],
      URL: "https://socialnetworklite.herokuapp.com"
    }
  }

  componentDidMount(){
    let userToken = JSON.parse(sessionStorage.getItem('token'))
    
    fetch(`${this.state.URL}/posts?username=${this.state.username}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${userToken}`
      }})
      .then(response => response.json())
      .then(data => {
        console.log('this is the user posts from account', data)

        this.setState({
          userPosts: data.posts,
        })

      })
  }

    render() {

      let allUserPosts = this.state.userPosts.map((element, index) => {

      let horizontalStack = {
        display: 'flex', 
        flexDirection: 'row'
      }
        //create a function that computes the actual time EST from element.createdAT

        return (
    <Card className="text-center">
    <Card.Body>
      <Card.Title>{element.username}</Card.Title>
      <Card.Text>
       {element.text}{' '}
      </Card.Text>
      <Card.Text>

        <small className="text-muted">Last updated at {element.createdAt}</small>
      </Card.Text>
    </Card.Body>
  </Card>
    )
      })
        return (
          
<div className="p-5">
<CardColumns>

  {allUserPosts}
  </CardColumns> 

  </div>
        );
    }
}

export default Posts;