import React from 'react';
import { withRouter } from 'react-router-dom';

let Device = (props) => {
    return (
        <tr onClick={() => {
            props.onGoToDeviceCard(props);
        }}>
            <td>{props?.brand?.brand} {props.device.model}</td>
            <td>{props.category.category}</td>
            <td>{props.device.inv_number}</td>
            <td>{props.user.full_name}</td>
        </tr>
    );
}

export default withRouter(Device);