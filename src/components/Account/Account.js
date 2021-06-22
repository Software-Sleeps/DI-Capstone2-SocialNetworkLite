import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import AccountOverview from './AccountOverview/AccountOverview';

class Account extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                
                <div>
                    <AccountOverview/>
                </div>
            </div>
        );
    }
}

export default Account;