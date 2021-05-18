import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { eventsGet } from '../../../redux/eventsReducer';
import { usersGet } from '../../../redux/usersReducer';
import { devicesGet } from '../../../redux/devicesReducer';
import { brandsGet } from '../../../redux/brandsReducer';
import { categoriesGet } from '../../../redux/categoriesReducer';
import GivenReturnDeviceEventContainer from './Event/GivenReturnDeviceEvent/GivenReturnDeviceEventContainer';
import MentoringEventContainer from './Event/MentoringEvent/MentoringEventContainer';
import { MentoringConnectionsGet } from '../../../redux/mentoringConnectionsReducer';

let Events = (props) => {
    let eventsArr = [];

    for (let id in props.events) {
        let Event;
        switch (props.events[id].name) {
            case 'givenDevice':
                Event = GivenReturnDeviceEventContainer(id);
                break;
            case 'returnDevice':
                Event = GivenReturnDeviceEventContainer(id);
                break;
            case 'mentoring':
                Event = MentoringEventContainer(id);
                break;
            default:
                break;
        }
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
                {
                    eventsArr.length ? eventsArr :
                    <tbody>
                        <tr>
                            <td colSpan="4">
                                {props.searchOn ? 'По запросу поиска ничего не найдено' : 'Список данных пуст'}
                            </td>
                        </tr>
                    </tbody>
                }
            </table>
        </div>
    );
}

let EventsClassComponent = class extends React.Component {
    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.eventsState.events) || isEmptyObject(state.usersState.users)
        || isEmptyObject(state.devicesState.devices) || isEmptyObject(state.brandsState.brands)
        || isEmptyObject(state.categoriesState.categories) || isEmptyObject(state.mentoringConnectionsState.mentoringConnections)) {
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
            if (isEmptyObject(state.categoriesState.categories)) {
                promiseArr.push(categoriesGet());
            }
            if (isEmptyObject(state.mentoringConnectionsState.mentoringConnections)) {
                promiseArr.push(MentoringConnectionsGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'events') this.props.onEventsGet(value.data);
                        if (value.config.url === 'users') this.props.onUsersGet(value.data);
                        if (value.config.url === 'devices') this.props.onDevicesGet(value.data);
                        if (value.config.url === 'brands') this.props.onBrandsGet(value.data);
                        if (value.config.url === 'categories') this.props.onCategoriesGet(value.data);
                        if (value.config.url === 'mentoring') this.props.mentoringConnectionsSet(value.data);
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