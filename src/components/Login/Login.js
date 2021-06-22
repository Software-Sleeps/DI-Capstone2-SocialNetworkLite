import React, { Component } from 'react';
import CreateUser from '../CreateUser/CreateUser';

import './Login.css'
import { withRouter } from 'react-router'
import {Form, Button} from 'react-bootstrap'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',

            //temporary until passed to props
            URL: 'https://socialnetworklite.herokuapp.com',
            token: ''
        }

        this.handleUsernameChange=this.handleUsernameChange.bind(this)
        this.handlePasswordChange=this.handlePasswordChange.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
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
            console.log("ALL login data", data)

            if(data.statusCode > 399){

                //display error message

            } else {

            this.setState({
                //changing token state value to token in data
                token: data.token,

                //resets username and password inputs
                username: "",
                password: ""
            })

            //stores token to access throughout account
            sessionStorage.setItem('token', JSON.stringify(data.token))

            //making sure that token was stored
            console.log(sessionStorage.getItem('token'))

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