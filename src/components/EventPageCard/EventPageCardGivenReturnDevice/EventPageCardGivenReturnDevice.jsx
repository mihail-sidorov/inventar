import React from 'react';
import { NavLink } from 'react-router-dom';
import isEmptyObject from '../../../functions/isEmptyObject';
import { brandsGet } from '../../../redux/brandsReducer';
import { categoriesGet } from '../../../redux/categoriesReducer';
import { devicesGet } from '../../../redux/devicesReducer';
import { usersGet } from '../../../redux/usersReducer';

let EventPageCardGivenReturnDevice = (props) => {
    function confirms(nameConfirmField) {
        let confirmArr = [];
        if (props.events[props.eventId] !== undefined) {
            props.events[props.eventId][nameConfirmField].forEach((el, index) => {
                let users = '';
                let i = 1;
                if (el.user_id !== undefined && (el.user_id instanceof Object) && !isEmptyObject(el.user_id)) {
                    for (let id in el.user_id) {
                        if (i === 1 && props.users[id]?.full_name && (users += props.users[id]?.full_name)) i++;
                        else props.users[id]?.full_name && (users += ', ' + props.users[id]?.full_name);
                    }
                }
                confirmArr.push(
                    <tr key={index}>
                        <td>{el.group}</td>
                        <td>{users}</td>
                    </tr>
                );
            });
        }
        return confirmArr;
    }

    return (
        <div className="event-page-card-given-return-device">
            <NavLink className="event-page-card-given-return-device__back-to-events btn" to="/events">Вернуться к списку событий</NavLink>
            <div className="event-page-card-given-return-device__border">
                <div className="event-page-card-given-return-device__title">Карточка события</div>
                <div className="event-page-card-given-return-device__content">
                    <div className="event-page-card-given-return-device__inform">
                        <div className="event-page-card-given-return-device__confirm-need-title">Информация</div>
                        <div className="event-page-card-given-return-device__confirm-need-table">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Наименование</td>
                                        <td>
                                            {props.events[props.eventId]?.name_rus}<br />
                                            {props.brands[props.devices[props.events[props.eventId]?.table_id]?.brand_id]?.brand},&nbsp;
                                            {props.devices[props.events[props.eventId]?.table_id]?.model},&nbsp;
                                            {props.categories[props.devices[props.events[props.eventId]?.table_id]?.category_id]?.category},&nbsp;
                                            {props.devices[props.events[props.eventId]?.table_id]?.inv_number}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Кому</td>
                                        <td>{(props.events[props.eventId]?.name === 'givenDevice' || props.events[props.eventId]?.name === 'returnDevice') && props.users[props.events[props.eventId]?.additional[0].value[0]]?.full_name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {
                        props.events[props.eventId]?.confirm_need.length ?
                        <div className="event-page-card-given-return-device__confirm-need">
                            <div className="event-page-card-given-return-device__confirm-need-title">Должны подтвердить</div>
                            <div className="event-page-card-given-return-device__confirm-need-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Группа</th>
                                            <th>Пользователи</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {confirms('confirm_need')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        : null
                    }
                    {
                        props.events[props.eventId]?.confirm.length ?
                        <div className="event-page-card-given-return-device__confirm">
                            <div className="event-page-card-given-return-device__confirm-title">Подтвердили</div>
                            <div className="event-page-card-given-return-device__confirm-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Группа</th>
                                            <th>Пользователи</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {confirms('confirm')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        : null
                    }
                    {
                        props.events[props.eventId]?.confirm_reject.length ?
                        <div className="event-page-card-given-return-device__confirm-reject">
                            <div className="event-page-card-given-return-device__confirm-reject-title">Отклонили</div>
                            <div className="event-page-card-given-return-device__confirm-reject-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Группа</th>
                                            <th>Пользователи</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {confirms('confirm_reject')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        : null
                    }
                </div>
            </div>

        </div>
    );
}

let EventPageCardGivenReturnDeviceClassComponent = class extends React.Component {
    render() {
        return (
            <EventPageCardGivenReturnDevice {...this.props} />
        );
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.usersState.users) || isEmptyObject(state.brandsState.brands)
        || isEmptyObject(state.categoriesState.categories) || isEmptyObject(state.devicesState.devices)) {
            let promiseArr = [];

            if (isEmptyObject(state.usersState.users)) {
                promiseArr.push(usersGet());
            }
            if (isEmptyObject(state.brandsState.brands)) {
                promiseArr.push(brandsGet());
            }
            if (isEmptyObject(state.categoriesState.categories)) {
                promiseArr.push(categoriesGet());
            }
            if (isEmptyObject(state.devicesState.devices)) {
                promiseArr.push(devicesGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'users') this.props.usersSet(value.data);
                        if (value.config.url === 'brands') this.props.brandsSet(value.data);
                        if (value.config.url === 'categories') this.props.categoriesSet(value.data);
                        if (value.config.url === 'devices') this.props.devicesSet(value.data);
                    });
                })
                .catch(err => console.log(err));
        }
    }
}

export default EventPageCardGivenReturnDeviceClassComponent;