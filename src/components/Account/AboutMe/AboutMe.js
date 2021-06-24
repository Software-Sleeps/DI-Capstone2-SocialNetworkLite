import React, { Component } from "react";
import { Container, Row, Col, Button, FormControl, Form } from "react-bootstrap";

class AboutMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleAM: false,
      URL: "https://socialnetworklite.herokuapp.com",
      username: JSON.parse(sessionStorage.getItem('username')),
      aboutMe: ''
    };
    this.handleToggleAM = this.handleToggleAM.bind(this);
    this.handleAMChange = this.handleAMChange.bind(this);
    this.handleAMUpdate = this.handleAMUpdate.bind(this);
  }

  handleToggleAM() {
    this.state.toggleAM
      ? this.setState({ toggleAM: false })
      : this.setState({ toggleAM: true });
  }

  handleAMChange(event){
    this.setState({aboutMe: event.target.value})
  }

  handleAMUpdate(event){
    event.preventDefault()
    let userToken = JSON.parse(sessionStorage.getItem('token'))

    fetch(`${this.state.URL}/users/${this.state.username}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": `bearer ${userToken}`
      },
      body: JSON.stringify({about: this.state.aboutMe})})
      .then(response => response.json())
      .then(data =>{
        console.log('update about me', data)
        this.setState({aboutMe: data.user.about})
      })

      this.handleToggleAM()
  }

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
          aboutMe: data.user.about,
        })

      })
  }

  render() {
    let inputSize = {
      width: "60%",
      marginLeft: "20%",
    };

    return (
      <div>
        <Container fluid>
          {this.state.aboutMe === ""? (
          <div className="text-center pt-5">
            <h4>What do you want others to know about you?</h4>
                <p>Add an About Me!</p>
            </div>) : ("")}
            
          {!this.state.toggleAM ? (
            <Row className={"text-center row-padding"}>
              {" "}
              <Col className="p-5">
                <Col className="row-padding">
                  <h4>{this.state.aboutMe}</h4>
                </Col>
                <Button onClick={this.handleToggleAM}>
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
                  <Col className="text-center p-5">
                    <Form onSubmit={this.handleAMUpdate}>

                    <FormControl
                      style={inputSize}
                      onChange={this.handleAMChange}
                      placeholder="Change About Me"
                      as="textarea"
                      name={this.state.aboutMe}
                      value={this.state.aboutMe}
                      rows={5}
                    />
                    <Button type="submit" value="submit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-upload"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                      </svg>
                    </Button>

                    </Form>
                    <Col className="p-5">
                      <Button onClick={this.handleToggleAM}>
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
                  </Col>
                </Row>
              </Col>{" "}
            </Row>
          )}
        </Container>
      </div>
    );
  }
}

export default AboutMe;
