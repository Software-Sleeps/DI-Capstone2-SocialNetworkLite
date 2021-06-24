import React, { Component } from "react";
import "./AccountOverview.css";
import testAccount from '../../../icons8-test-account-96.png'
import { Button, Container, Row, Col, Modal, Form } from 'react-bootstrap'
class AccountOverview extends Component {
constructor(props){
  super(props)
  this.state = {
    URL: "https://socialnetworklite.herokuapp.com",
    username: JSON.parse(sessionStorage.getItem('username')),
    displayName: JSON.parse(sessionStorage.getItem('displayName')),
    aboutMe: '',
    picture: null,
    showModal: false,
  }

  this.handlePicChange=this.handlePicChange.bind(this)
  this.handleSetPicture=this.handleSetPicture.bind(this)
}
  
//Modal Boolean
handleModal = () => this.setState({showModal: true})
handleClose = () => this.setState({showModal: false})

// handleChange(event){
//   this.setState({[event.target.id]: event.target.value})
// }

handlePicChange(event){
  this.setState({picture: event.target.files[0]})
  this.setState({picture: event.target.value})

}

handleSetPicture(event){
  event.preventDefault()

  let userToken = JSON.parse(sessionStorage.getItem('token'))

  //for form to handle upload
  let form_data = new FormData();
    form_data.append('picture', this.state.picture);
  

  fetch(`${this.state.URL}/users/${this.state.username}/picture`, form_data,{
    method: "Put",
    headers:{
      "Content-Type": 'multipart/form-data',
      "authorization": `bearer ${userToken}`
    },
    body: JSON.stringify({picture: this.state.picture})
  })
  .then(response => response.json())
  .then(data =>{
    console.log('pic data', data)
    // this.setState({picture: data.picture})
  }).catch(error => console.log(error))
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

      console.log('this is data from get user by ID', data)

      this.setState({
        //displayName: data.user.displayName,
        aboutMe: data.user.about,
        picture: data.user.pictureLocation
      })
    })
}

  render() {
    let adjustButtons = {
        width: "30%",
        height: "30%"
    }

    return (
      <div className=" text-center p-input">
        <Container fluid>
          {/*  PIC & USERNAME */}
          <Row>
          <Col>
            <img src={testAccount} alt=""/>
            <h4>{this.state.displayName}</h4>
            <p>{this.state.username}</p>
            </Col>
          {/* PIC & USERNAME */}

          {/* Update Pic & Delete User Buttons */}
          
          <Col>
            <div className="p-4"><Button style={adjustButtons} onClick={this.handleModal}>Update Picture</Button></div>
            <div className="p-4"><Button style={adjustButtons}>Delete User</Button></div>
          </Col>

          {/* Update Pic & Delete User Buttons */}
          </Row>


      <Modal 
        show={this.state.showModal}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Update Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  
          <Form onSubmit={this.handleSetPicture}>
        <Form.Group>
        <Form.File 
        id="exampleFormControlFile1" 
        label="Example file input" 
        name={this.state.picture}
        value={this.state.picture}
        onChange={this.handlePicChange}/>
        </Form.Group>

        <Button type="submit" value="submit">Upload Picture</Button>
          </Form>

        </Modal.Body>

      </Modal>
          </Container>
        </div>
    );
  }
}

export default AccountOverview;
