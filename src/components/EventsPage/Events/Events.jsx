import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { eventsGet } from '../../../redux/eventsReducer';
import { usersGet } from '../../../redux/usersReducer';
import EventContainer from './Event/EventContainer';

let Events = (props) => {
    let eventsArr = [];

    for (let id in props.events) {
        let Event = EventContainer(id);
        eventsArr.push(<Event key={id} />);
    }

    return (
        <div className="events">
            <table>
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Инициатор</th>
                        <th>Дата</th>
                        <th>Кому</th>
                        <th></th>
                    </tr>
                </thead>
                {eventsArr}
            </table>
        </div>
    );
}

let EventsClassComponent = class extends React.Component {
    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.eventsState.events) || isEmptyObject(state.usersState.users)) {
            let promiseArr = [];

            if (isEmptyObject(state.eventsState.events)) {
                promiseArr.push(eventsGet());
            }
            
            if (isEmptyObject(state.usersState.users)) {
                promiseArr.push(usersGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'events?all=true') this.props.onEventsGet(value.data);
                        if (value.config.url === 'users') this.props.onUsersGet(value.data);
                    });

                    this.props.onMakeShortEvents();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.onMakeShortEvents();
        }
    }

    render() {
        return (
            <Events {...this.props} />
        );
    }
}

export default EventsClassComponent;