import React from 'react';

let Event = (props) => {
    let createDate, actorName;

    if (props.users[props.event.actor_id] !== undefined) {
        actorName = props.users[props.event.actor_id].full_name;
    }

    let date = new Date(props.event.date);
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
    createDate = date.getUTCFullYear() + '-' + month + '-' + day;

    return (
        <tr>
            <td>{props.event.name_rus}</td>
            <td>{createDate}</td>
            <td>{actorName}</td>
        </tr>
    );
}

export default Event;