import React from 'react';
import { withRouter } from 'react-router-dom';

let Device = (props) => {
    let date = new Date(props.device.date_purchase);
    let month = Number(date.getUTCMonth()) + 1;
    if (month < 10) {
        month = '0' + String(month);
    }
    else {
        month = String(month);
    }
    let day = Number(date.getUTCDate());
    if (day < 10) {
        day = '0' + String(day);
    }
    else {
        day = String(day);
    }
    let datePurchase = date.getUTCFullYear() + '-' + month + '-' + day;

    return (
        <tr onClick={() => {
            props.onGoToDeviceCard(props);
        }}>
            <td>
                {
                    props.device.inv_number.match(/^PC/)
                    ?
                    props?.device?.specifications?.code
                    :
                    `${props?.brand?.brand} ${props.device.model}`
                }
            </td>
            <td>{props.category.category}</td>
            <td>{props.device.inv_number}</td>
            <td>{props.user.full_name}</td>
            <td>{datePurchase}</td>
            <td>{props.device.comments}</td>
            <td>{props.device.status_rus}</td>
        </tr>
    );
}

export default withRouter(Device);