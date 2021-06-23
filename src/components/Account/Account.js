import React, { Component } from 'react';
import Navigation from '../Navigation/Navigation';
import AccountOverview from './AccountOverview/AccountOverview';
import UserTabs from './UserTabs/UserTabs';

class Account extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                
                <div>
                    <AccountOverview/>
                    <UserTabs/>
                </div>
            </div>
        );
    }
}

export default Account;