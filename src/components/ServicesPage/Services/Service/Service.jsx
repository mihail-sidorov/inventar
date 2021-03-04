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
            <td>{props.service.url}</td>
            <td>{props.service.comments}</td>
        </tr>
    );
}

export default withRouter(Service);