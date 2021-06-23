import React, { Component } from "react";
import './User.css'
import { Container, Row, Col, FormControl, Button, Form } from "react-bootstrap";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //will toggle columns in User Tab section
      toggleDN: false,
      togglePW: false,
      URL: "https://socialnetworklite.herokuapp.com",
      username: JSON.parse(sessionStorage.getItem('username')),
      displayName: '',
      password: '' 
     
    };

    this.handleToggleDN = this.handleToggleDN.bind(this)
    this.handleTogglePW = this.handleTogglePW.bind(this)
    this.handleDNChange = this.handleDNChange.bind(this)
    this.handlePWChange = this.handlePWChange.bind(this)
    this.handleDNUpdate = this.handleDNUpdate.bind(this)
    this.handlePWUpdate = this.handlePWUpdate.bind(this)
  }

  //toggle state value

  handleToggleDN() {
    this.state.toggleDN
      ? this.setState({ toggleDN: false })
      : this.setState({ toggleDN: true });
  }

  handleTogglePW(){
    this.state.togglePW
    ? this.setState({ togglePW: false })
    : this.setState({ togglePW: true });
  }

  //changes state value
  handleDNChange(event){
    this.setState({displayName: event.target.value})
  }

  handlePWChange(event){
    this.setState({password: event.target.value})
  }

  handleDNUpdate(event){
    event.preventDefault()

    let userToken = JSON.parse(sessionStorage.getItem('token'))
   
    fetch(`${this.state.URL}/users/${this.state.username}`,{
      method: "PATCH", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${userToken}`,
      },
      body: JSON.stringify({
        displayName: this.state.displayName
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("THIS IS PATCH DATA FOR DISPLAY NAME",data)
        sessionStorage.setItem('displayName', JSON.stringify(data.user.displayName))
        this.setState({displayName: data.user.displayName})
        this.handleToggleDN()
    })}

    handlePWUpdate(event){
      event.preventDefault()
  
      let userToken = JSON.parse(sessionStorage.getItem('token'))
     
      fetch(`${this.state.URL}/users/${this.state.username}`,{
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${userToken}`,
        },
        body: JSON.stringify({
          password: this.state.password
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log("THIS IS PATCH DATA FOR USERNAME",data)

          this.handleTogglePW()
      })}

  componentDidMount(){

    let userToken = JSON.parse(sessionStorage.getItem('token'))
    
    fetch(`${this.state.URL}/users/${this.state.username}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${userToken}`
      }})
      .then(response => response.json())
      .then(data => {
  
        this.setState({
          displayName: data.user.displayName,
        })
      })
  }

  render() {
    let inputSize = {
      width: "60%",
      marginLeft: "20%"
    };

    let formStyle = {
      width: "90%",
      display: "flex",
      alignItems: "row"
    }

    return (
      <div>
        <Container fluid className="container-padding">
          {!this.state.toggleDN ? (
            <Row className={"text-center row-padding"}>
              {" "}
              <Col className="p-4">
                <h4>{this.state.displayName}</h4>
              </Col>
              <Col className="p-4">
                <Button onClick={this.handleToggleDN}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>{" "}
                  Update
                </Button>
              </Col>
            </Row>
          ) : (
            <Row className={"text-center row-padding"}>
              <Col className="p-3">
                <Row>
                 <Form style={formStyle} onSubmit={this.handleDNUpdate}>
                  <FormControl 
                  style={inputSize} 
                  placeholder="Change Display Name"
                  name={this.state.displayName}
                  value={this.state.displayName}
                  onChange={this.handleDNChange}/>
                  <Button type="submit" value="submit">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-arrow-right-square-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z" />
                    </svg>
                  </Button>
                  </Form>
                </Row>
              </Col>{" "}
              <Col className="p-4">
                <Button onClick={this.handleToggleDN}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>{" "}
                  Cancel
                </Button>
              </Col>
            </Row>
          )}

{!this.state.togglePW ? (
            <Row className={"text-center row-padding"}>
            {" "}
            <Col className="p-4">
              <h4>Password</h4>
            </Col>
            <Col className="p-4">
              <Button onClick={this.handleTogglePW}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>{" "}
                Change
              </Button>
            </Col>
          </Row>
        ) : (
            <Row className={"text-center row-padding"}>
            <Col className="p-3">
              <Row>
                <Form style={formStyle} onSubmit={this.handlePWUpdate}>
                <FormControl 
                style={inputSize} 
                placeholder="Change Password"
                name={this.state.password}
                value={this.state.password}
                onChange={this.handlePWChange}/>
                <Button onClick={this.handlePWUpdate}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-arrow-right-square-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12zm4.5-6.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5a.5.5 0 0 1 0-1z" />
                  </svg>
                </Button>
                </Form>
              </Row>
            </Col>{" "}
            <Col className="p-4">
              <Button onClick={this.handleTogglePW}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>{" "}
                Cancel
              </Button>
            </Col>
          </Row>
        )}
          
        </Container>
      </div>
    );
  }
}

export default User;
