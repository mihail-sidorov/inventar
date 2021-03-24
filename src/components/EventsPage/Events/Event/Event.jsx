import React from 'react';
import { withRouter } from 'react-router';
import $ from 'jquery';

let ActionEventBtn = (props) => {
    return (
        <button className={`action-event-btn${props.className ? ' ' + props.className : ''}`} onClick={() => {
            let type;
            if (props.className === 'action-event-btn_accept') type = 'accept';
            else type = 'reject';
            if (props.id) props.actionEvent(props.id, type);
            else props.actionGroup(props.ids, type);
        }}></button>
    );
}

let Event = (props) => {
    let eventsArr = [];
    let eventIds = [];
    for (let id in props.event.events) {
        let createDate, actorName;

        if (props.users[props.event.events[id].actor_id] !== undefined) {
            actorName = props.users[props.event.events[id].actor_id].full_name;
        }

        let date = new Date(props.event.events[id].date);
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
        for (let i = 0; i < props.event.events[id].confirm_need.length; i++) {
            if (props.event.events[id].confirm_need[i].user_id[props.userId]) {
                showBtns = true;
                eventIds.push(`${props.event.events[id].history_id},${props.event.events[id].event_confirm_preset_id}`);
                break;
            }
        }

        eventsArr.push(
            <tr key={id} onClick={(e) => {
                if (e.target.nodeName !== 'BUTTON') {
                    props.goToEventCard(id, props.history);
                }
            }}>
                <td>{props.event.events[id].name_rus}</td>
                <td>{actorName}</td>
                <td>{createDate}</td>
                <td>
                    {
                        (props.event.events[id].name === 'givenDevice' || props.event.events[id].name === 'returnDevice') && props.users[props.event.events[id].additional[0].value[0]]?.full_name
                    }
                </td>
                <td>
                    
                    {
                        showBtns &&
                        <div className="action-event-btns">
                            <ActionEventBtn id={id} className="action-event-btn_accept" actionEvent={props.actionEvent} />
                            <ActionEventBtn id={id} className="action-event-btn_reject" actionEvent={props.actionEvent} />
                        </div>
                    }
                </td>
            </tr>
        );
    }

    return (
        <tbody className="events__group">
            <tr onClick={(e) => {
                if (e.target.nodeName !== 'BUTTON') {
                    $(e.currentTarget).parent().toggleClass('events__group_show');
                }
            }}>
                <td colSpan="4">
                    Группа: {props.event.name}
                </td>
                <td>
                    {
                        eventIds.length > 0 &&
                        <div className="action-event-btns">
                            <ActionEventBtn ids={eventIds} className="action-event-btn_accept" actionGroup={props.actionGroup} />
                            <ActionEventBtn ids={eventIds} className="action-event-btn_reject" actionGroup={props.actionGroup} />
                        </div>
                    }
                </td>
            </tr>
            {eventsArr}
        </tbody>
    );
}

export default withRouter(Event);