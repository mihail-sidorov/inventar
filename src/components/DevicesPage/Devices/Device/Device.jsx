import React from 'react';

let Device = (props) => {
    return (
        <tr>
            <td>{`${props.brand.brand} ${props.device.model}`}</td>
            <td>{props.device.inv_number}</td>
            <td>{props.user.full_name}</td>
        </tr>
    );
}

export default Device;