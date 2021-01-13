import React from 'react';
import { withRouter } from 'react-router-dom';

let Service = (props) => {
    return (
        <tr onClick={() => {
            props.onGoToServiceCard(props);
        }}>
            <td>{props.serviceName}</td>
            <td>{props.service.login}</td>
            <td>{props.service.password}</td>
        </tr>
    );
}

export default withRouter(Service);