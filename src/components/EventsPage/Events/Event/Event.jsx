import React from 'react';

let ActionEventBtn = (props) => {
    return (
        <button className={`action-event-btn${props.className ? ' ' + props.className : ''}`} onClick={() => {
            let type;
            if (props.className === 'action-event-btn_accept') type = 'accept';
            else type = 'reject';
            props.actionEvent(props.id, type);
        }}></button>
    );
}

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

    let showBtns = false;
    for (let i = 0; i < props.event.confirm_need.length; i++) {
        if (props.event.confirm_need[i].user_id[props.userId]) {
            showBtns = true;
            break;
        }
    }

    return (
        <tr>
            <td>{props.event.name_rus}</td>
            <td>{actorName}</td>
            <td>{createDate}</td>
            <td>
                {
                    (props.event.name === 'givenDevice' || props.event.name === 'returnDevice') && props.event.additional[0].name
                }
            </td>
            <td>
                <div className="action-event-btns">
                    {
                        showBtns &&
                        <>
                            <ActionEventBtn {...props} className="action-event-btn_accept" />
                            <ActionEventBtn {...props} className="action-event-btn_reject" />
                        </>
                    }
                </div>
            </td>
        </tr>
    );
}

export default Event;