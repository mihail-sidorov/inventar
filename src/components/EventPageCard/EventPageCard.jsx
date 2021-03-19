import React from 'react';
import { Route, withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import isEmptyObject from '../../functions/isEmptyObject';
import { eventsGet } from '../../redux/eventsReducer';
import { usersGet } from '../../redux/usersReducer';
import InnerPage from '../InnerPage/InnerPage';

let EventPageCard = (props) => {
    function confirms(nameConfirmField) {
        let confirmArr = [];
        if (props.events[props.match.params.eventId] !== undefined) {
            props.events[props.match.params.eventId][nameConfirmField].forEach((el, index) => {
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
        <div className="event-page-card">
            <div className="event-page-card__wrapper section-2">
                <Route path="/:page/card" render={() => (
                    <InnerPage>
                        <NavLink className="event-page-card__back-to-events btn" to="/events">Вернуться к списку событий</NavLink>
                        <div className="event-page-card__border">
                            <div className="event-page-card__title">Карточка события</div>
                            <div className="event-page-card__content">
                                <div className="event-page-card__inform">
                                    <div className="event-page-card__confirm-need-title">Информация</div>
                                    <div className="event-page-card__confirm-need-table">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Наименование</td>
                                                    <td>{props.events[props.match.params.eventId]?.name_rus}</td>
                                                </tr>
                                                <tr>
                                                    <td>Кому</td>
                                                    <td>{(props.events[props.match.params.eventId]?.name === 'givenDevice' || props.events[props.match.params.eventId]?.name === 'returnDevice') && props.events[props.match.params.eventId]?.additional[0].name}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                {
                                    props.events[props.match.params.eventId]?.confirm_need.length ?
                                    <div className="event-page-card__confirm-need">
                                        <div className="event-page-card__confirm-need-title">Должны подтвердить</div>
                                        <div className="event-page-card__confirm-need-table">
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
                                    props.events[props.match.params.eventId]?.confirm.length ?
                                    <div className="event-page-card__confirm">
                                        <div className="event-page-card__confirm-title">Подтвердили</div>
                                        <div className="event-page-card__confirm-table">
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
                                    props.events[props.match.params.eventId]?.confirm_reject.length ?
                                    <div className="event-page-card__confirm-reject">
                                        <div className="event-page-card__confirm-reject-title">Отклонили</div>
                                        <div className="event-page-card__confirm-reject-table">
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
                    </InnerPage>
                )} />
            </div>
        </div>
    );
}

let EventPageCardClassComponent = class extends React.Component {
    render() {
        return (
            <EventPageCard {...this.props} />
        );
    }

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
                        if (value.config.url === 'events?all=true') this.props.eventsSet(value.data);
                        if (value.config.url === 'users') this.props.usersSet(value.data);
                        
                    });
                })
                .catch(err => console.log(err));
        }
    }
}

export default withRouter(EventPageCardClassComponent);