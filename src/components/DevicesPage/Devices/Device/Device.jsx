import React from 'react';

let Device = (props) => {
    return (
        <tr>
            <td>Наименование 1</td>
            <td>{props.device.inv_number}</td>
            <td>Сотрудник 1</td>
        </tr>
    );
}

export default Device;