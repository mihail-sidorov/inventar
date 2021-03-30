import React from 'react';
import Page404 from '../Page404/Page404';

let SwitchRoles = class extends React.Component {
    checkRole() {
        for (let i = 0; i < this.props.roles.length; i++) {
            if (this.props.roles[i].role === this.props.role) {
                return this.props.roles[i].component;
            }
        }
    }

    render() {
        return this.checkRole() ?? <Page404 />;
    }
}

export default SwitchRoles;