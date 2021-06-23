import React, { Component } from 'react';
import CreateUser from '../CreateUser/CreateUser';

import './Login.css'
import { withRouter } from 'react-router'
import {Form, Button} from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            showAlert: false,

            //temporary until passed to props
            URL: 'https://socialnetworklite.herokuapp.com',
        }

        this.handleUsernameChange=this.handleUsernameChange.bind(this)
        this.handlePasswordChange=this.handlePasswordChange.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
        this.closeAlert=this.closeAlert.bind(this)
        this.openAlert= this.openAlert.bind(this)
    }

    //handle alert
    closeAlert(){
        this.setState({showAlert: false})
    }

    openAlert(){
        this.setState({showAlert: true})
    }

    //for username
    handleUsernameChange(event){
        this.setState({
            username: event.target.value
        })

    }

    //for password
    handlePasswordChange(event){
        this.setState({
            password: event.target.value
        })
    }

    //login user
    handleLogin(event){
        event.preventDefault()

        fetch(`${this.state.URL}/auth/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(data =>{
            
            sessionStorage.setItem('username', JSON.stringify(this.state.username))


            this.setState({
                //resets username and password inputs
                username: "",
                password: ""
            })

            if(data.statusCode > 399){


                //display error message
                this.openAlert()
            } else {

            //stores token to access throughout account
            sessionStorage.setItem('token', JSON.stringify(data.token))

            //making sure that token was stored
            // console.log(JSON.parse(sessionStorage.getItem('token')))

            this.props.history.push('/dashboard')

        }
        })
    

    }

    render() {
        return (
            <div className="text-center">
                

                        <div className="pt-5">
                    <h2>Login</h2>
                    <p>Sign in to continue</p>
                        </div>
                    <div className="w-25">
                        <Alert 
                        className="d-flex justify-content-center"
                        variant="danger" 
                        show={this.state.showAlert} 
                        onClose={this.closeAlert} 
                        dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Error Logging in! Please Try Again!
          </p>
        </Alert>
        </div>
                <form onSubmit={this.handleLogin} className="p-5">

                <Form.Group controlId="formBasicEmail" className="p-inline pb-3">

                <Form.Label>Username</Form.Label>
                <Form.Control type="text"
                        onChange={this.handleUsernameChange}
                        name={this.state.username}
                        value={this.state.username} 
                        placeholder="Enter Username" />

                    </Form.Group>
            
            <Form.Group controlId="formBasicPassword"  className="p-inline pb-3">

            <Form.Label className="text-align-start">Password</Form.Label>

            <Form.Control 
                type="password" 
                placeholder="Enter Password" 
                onChange={this.handlePasswordChange}
                name={this.state.password}
                value={this.state.password} 
                minLength="3" maxLength="20"
                />

                </Form.Group>    

                <Button variant="dark" type="submit" value="Submit" className="pr-5 pl-5"> 
                    Log in
                </Button>

                </form>

                <h6>Or</h6>

                <CreateUser/>
            </div>
        );
    }
}

export default withRouter(Login);