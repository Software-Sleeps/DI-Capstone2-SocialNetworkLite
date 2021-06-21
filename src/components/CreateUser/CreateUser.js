import React, { Component } from 'react';

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
        })
    }

    render() {

       
        return (
            <div>

                <form onSubmit={this.createUser}>
                    <label htmlFor="createUN">
                        Create Username

                        <input 
                        type="text"
                        onChange={this.handleUNChange}
                        name={this.state.createUN}
                        value={this.state.createUN}
                        />
                    </label>


                    <label htmlFor="displayName">
                        Create Display Name

                        <input
                        type="text"
                        onChange={this.handleDNChange}
                        name={this.state.displayName}
                        value={this.state.displayName}
                        />
                    </label>

                    <label htmlFor="createPW">
                        Create Password

                        <input
                        type="password"
                        onChange={this.handlePWChange}
                        name={this.state.createPW}
                        value={this.state.createPW}
                        />

                    </label>

                    <input type="submit" value="Submit"/>

                </form>
                
            </div>
        );
    }
}

export default CreateUser;