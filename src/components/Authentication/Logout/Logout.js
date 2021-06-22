import React from 'react';
import { Button } from 'react-bootstrap'
import {withRouter} from 'react-router'

function Logout(props) {
   
    const URL = 'https://socialnetworklite.herokuapp.com'

    const userToken = JSON.parse(sessionStorage.getItem('token'))

    const handleLogout = () =>{
        
        fetch(`${URL}/auth/logout`,{
            headers: {
                "Content-Type": "application/json",
                "authorization": `bearer ${userToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            props.history.push("/login")

            //removes all saved data from session storage
           sessionStorage.clear()

            console.log("logout data", data)
        
        })

    }
        return (
            <div>
                <Button onClick={handleLogout} variant="link">Logout</Button>
                
            </div>
        );
    
}

export default withRouter(Logout);