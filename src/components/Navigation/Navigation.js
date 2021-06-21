import { Link } from "react-router-dom";

import React, { Component } from 'react';

class Navigation extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
            </div>
        );
    }
}

export default Navigation;