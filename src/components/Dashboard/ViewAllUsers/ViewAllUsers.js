import React, { Component } from "react";

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
    const getAllUsers = this.state.allUsers.map((element) => {
      return (
       
        <div class="card m-4">
        <div class="card-body">
            <h5>{element.displayName}</h5>
            
          <h6> {element.username}</h6>
        {element.about === "" ? (<p>No about yet</p>) : 
        (<p>{element.about}</p>)}
        </div>
        </div>
      );
    });
    return <div>{getAllUsers}</div>;
  }
}

export default ViewAllUsers;
