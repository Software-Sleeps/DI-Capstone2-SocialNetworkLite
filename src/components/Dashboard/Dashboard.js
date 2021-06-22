import React, { Component } from 'react';
import GetPosts from './GetPosts/GetPosts';

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            text: '',
            //temp value until passed into props
            URL: 'https://socialnetworklite.herokuapp.com'
        }

        this.handleMessageChange = this.handleMessageChange.bind(this)
        this.createPost = this.createPost.bind(this)
    }

    //change state value
    handleMessageChange(event){
        this.setState({text: event.target.value})
    }

    //post request to submit posts
    createPost(event){
        event.preventDefault()

        const userToken = JSON.parse(sessionStorage.getItem('token'))

        fetch(`${this.state.URL}/posts`, {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `bearer ${userToken}`
            }),
            body: JSON.stringify({text: this.state.text}),

        })
        .then(response => response.json())
        .then(data =>{
            //data goes here    
            console.log("Post Request for Posts", data)
            console.log(userToken)
        }).catch(error => console.log(error))

    }

    //checking if Posts is in database
    //with automatic get request to console.log
    componentDidMount(){
        const userToken = sessionStorage.getItem('token')

        fetch(`${this.state.URL}/posts`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${userToken}`
            },
        })
    }

    render() {
        return (
            <div>
                {/* CHECKING TOKEN */}
                {sessionStorage.getItem('token') !== "" ? 
                <h4>There is a token</h4> : 
                <h6>There is no token</h6>
                }
                {/* CHECKING TOKEN */}

                <h1> This is the Dashboard</h1>

                <div>
                    <form onSubmit={this.createPost}>
                        <label htmlFor={this.state.text}>Create a Post
                        <input
                        type="text"
                        onChange={this.handleMessageChange}
                        name={this.state.text}
                        value={this.state.text}
                        />                    
                    
                        {/* </input> */}
                        </label>

                        <input type="submit" value="submit"/>
                    </form>
                </div>
                <div>
                    <GetPosts />
                </div>
            </div>
        );
    }
}

export default Dashboard;