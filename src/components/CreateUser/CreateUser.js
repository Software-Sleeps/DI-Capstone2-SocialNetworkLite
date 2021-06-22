import React, { Component } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap'
class CreateUser extends Component {

    constructor(props){
        super(props)

        this.state = {
            createUN: '',
            displayName: '',
            createPW: '',
            showModal: false,

            //temporarily as state but will turn URL to props
            URL: 'https://socialnetworklite.herokuapp.com'
        }

        this.createUser=this.createUser.bind(this)
        this.handleUNChange=this.handleUNChange.bind(this)
        this.handleDNChange=this.handleDNChange.bind(this)
        this.handlePWChange=this.handlePWChange.bind(this)
    }


    //Modal Boolean

    handleModal = () => this.setState({showModal: true})
    handleClose = () => this.setState({showModal: false})

    //for username
    handleUNChange(event){
        this.setState({
            createUN: event.target.value
        })
    }

    //for display name
    handleDNChange(event){
        this.setState({
            displayName: event.target.value
        })
    }

    //for password 
    handlePWChange(event){
        this.setState({
            createPW: event.target.value
        })
    }

    //will create user
    createUser(event){

        event.preventDefault()

        fetch(`${this.state.URL}/users`,{
            method: "POST",

            //will pass POST request
            headers: {
                "Content-Type": "application/json"
            },

            //converts DATA to JSON while being sent to the database
            body: JSON.stringify({
                username: this.state.createUN,
                displayName: this.state.displayName, 
                password: this.state.createPW
            })
        })
        .then(response => response.json())
        .then(data =>{
            console.log('this is data from CREATE USER', data) 
            
            this.setState({
                createUN: '',
                displayName: '',
                createPW: '',
            })

            if(data.statusCode > 399){
                //display error message

            } else {
                //create alert that thanks the user
                
            }
        })
    }

    render() {

       
        return (
            <div className="text-center">

                <Button variant="link" onClick={this.handleModal} className="btn-text">
                    Create an Account
                </Button>

      <Modal 
        show={this.state.showModal}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        <form onSubmit={this.createUser}>
        <Form.Group controlId="formEmail" className="pb-3">
                
                <Form.Label>Create Username</Form.Label>
                    
                        <Form.Control 
                        type="text"
                        onChange={this.handleUNChange}
                        name={this.state.createUN}
                        value={this.state.createUN}
                        placeholder="Jsmith202"
                        />
                
        </Form.Group>

                    <Form.Group controlId="formDisplayName" className="pb-3">
                       
                       <Form.Label>Create Display Name</Form.Label>

                        <Form.Control
                        type="text"
                        onChange={this.handleDNChange}
                        name={this.state.displayName}
                        value={this.state.displayName}
                        placeholder="Jane Smith"
                        />

                    </Form.Group>

                    <Form.Group controlId="formPassword" className="pb-3">

                    <Form.Label>
                        Create Password
                        </Form.Label>

                        <Form.Control
                        type="password"
                        onChange={this.handlePWChange}
                        name={this.state.createPW}
                        value={this.state.createPW}
                        placeholder="Choose a Password"
                        />


                    </Form.Group>
                   <div className="text-center">
                    <Button variant="dark" type="submit" value="submit">
                        Create Account
                    </Button>
                    </div>

                </form>


        </Modal.Body>

      </Modal>
                
            </div>
        );
    }
}

export default CreateUser;