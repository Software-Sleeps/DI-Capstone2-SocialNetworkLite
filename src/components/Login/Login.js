import React, { Component } from 'react';
import CreateUser from '../CreateUser/CreateUser';

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

            //changing token state value to token in data
            this.setState({
                token: data.token
            })

            //stores token to access throughout account
            sessionStorage.setItem('token', JSON.stringify(data.token))

            //making sure that token was stored
            console.log(sessionStorage.getItem('token'))
        })

    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleLogin}>
                    <label htmlFor="username">
                        Username

                        <input
                        type="text"
                        onChange={this.handleUsernameChange}
                        name={this.state.username}
                        value={this.state.username}
                        />
                    </label>

                    <label htmlFor="password">
                        Password
                        <input
                        type="password"
                        onChange={this.handlePasswordChange}
                        name={this.state.password}
                        value={this.state.password}
                        />
                    </label>

                <input type="submit" value="submit"/>
                </form>


                <CreateUser/>
            </div>
        );
    }
}

export default Login;