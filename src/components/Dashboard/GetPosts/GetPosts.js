import React, { Component } from 'react';

class GetPosts extends Component {
constructor(props){
    super(props)
    this.state = {
        posts: [],

        //Temporary
        URL: 'https://socialnetworklite.herokuapp.com'
    }
}

componentDidMount(){
    const userToken = JSON.parse(sessionStorage.getItem('token'))

fetch(`${this.state.URL}/posts?limit=5`,{
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization" : `bearer ${userToken}`
    },

})
.then(response => response.json())
.then(data => {
    console.log("GET Request for Posts", data)
   this.setState({
       posts: data.posts, 
   })
   console.log(typeof(this.state.posts))
})

}
    render() {
        const allPosts = this.state.posts.map(element => {
            return (
            <div>
                <p>{element.text}</p>
                
            </div>
            )
        })
        return (

            <div>
                <div>
                    {allPosts}
                </div>
                <h1>
                This is GET post
            
                </h1>
            </div>
        );
    }
}

export default GetPosts;