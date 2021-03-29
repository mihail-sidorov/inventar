import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { eventsGet } from '../../../redux/eventsReducer';
import { usersGet } from '../../../redux/usersReducer';
import { devicesGet } from '../../../redux/devicesReducer';
import { brandsGet } from '../../../redux/brandsReducer';
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

        if (isEmptyObject(state.eventsState.events) || isEmptyObject(state.usersState.users)
        || isEmptyObject(state.devicesState.devices) || isEmptyObject(state.brandsState.brands)) {
            let promiseArr = [];

            if (isEmptyObject(state.eventsState.events)) {
                promiseArr.push(eventsGet());
            }
            if (isEmptyObject(state.usersState.users)) {
                promiseArr.push(usersGet());
            }
            if (isEmptyObject(state.devicesState.devices)) {
                promiseArr.push(devicesGet());
            }
            if (isEmptyObject(state.brandsState.brands)) {
                promiseArr.push(brandsGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'events') this.props.onEventsGet(value.data);
                        if (value.config.url === 'users') this.props.onUsersGet(value.data);
                        if (value.config.url === 'devices') this.props.onDevicesGet(value.data);
                        if (value.config.url === 'brands') this.props.onBrandsGet(value.data);
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