import React from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import isEmptyObject from '../../functions/isEmptyObject';
import { accountsGet } from '../../redux/accountsReducer';
import { accountTypesGet } from '../../redux/accountTypesReducer';
import { brandsGet } from '../../redux/brandsReducer';
import { devicesGet } from '../../redux/devicesReducer';
import { employersGet } from '../../redux/employersReducer';
import { locationsGet } from '../../redux/locationsReducer';
import { postDepLocsGet } from '../../redux/postDepLocsReducer';
import { usersGet } from '../../redux/usersReducer';
import InnerPageContainer from '../InnerPage/InnerPageContainer';

let UserPageCard = (props) => {
    let user, fio, phone, email, login, appointmentDate, employer, location, postName, postDepartment, postLocation, userDevices = [], userServicesArr = [];

    if (props.users[props.match.params.userId] !== undefined) {
        user = props.users[props.match.params.userId];
        fio = user.full_name;
        phone = user.contact ? user.contact.phone : '';
        email = user.contact ? user.contact.email : '';
        login = user.login;

        let date = new Date(user.appointment_date);
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
        appointmentDate = date.getUTCFullYear() + '-' + month + '-' + day;

        if (props.employers[user.employer_id] !== undefined) {
            employer = props.employers[user.employer_id].employer;
        }
        if (props.locations[user.location_id] !== undefined) {
            location = props.locations[user.location_id].location;
        }
        if (props.postDepLocs[user.post_dep_loc_id] !== undefined) {
            postName = props.postDepLocs[user.post_dep_loc_id].post;
            postDepartment = props.postDepLocs[user.post_dep_loc_id].department;
            postLocation = props.postDepLocs[user.post_dep_loc_id].location;
        }

        for (let id in props.devices) {
            if ((props.devices[id].user_id == props.match.params.userId) && (props.devices[id].status === 'given' || props.devices[id].status === 'givenIncomplete' || props.devices[id].status === 'return')) {
                let brand;

                if (props.brands[props.devices[id].brand_id] !== undefined) {
                    brand = props.brands[props.devices[id].brand_id].brand;
                }

                userDevices.push(
                    <tr key={id} onClick={() => {
                        props.deviceCardShow(id, props.history);
                    }}>
                        <td>{brand} {props.devices[id].model}</td>
                        <td>{props.devices[id].inv_number}</td>
                    </tr>
                );
            }
        }

        let userServices = props.usersServices[props.match.params.userId]?.services;
        if (userServices !== undefined) {
            userServices.forEach((id) => {
                userServicesArr.push(
                    <tr key={id} onClick={() => {
                        props.serviceCardShow(id, props.history);
                    }}>
                        <td>{props.serviceTypes[props.services[id]?.account_type_id]?.account_type}</td>
                        <td>{props.services[id]?.login}</td>
                        <td>{props.services[id]?.password}</td>
                    </tr>
                );
            });
        }
    }

    return(
        <div className="user-page-card">
            <div className="user-page-card__wrapper section-2">
                <Route exact path="/:page/card/:userId" render={() => (
                    <InnerPageContainer>
                        <NavLink className="user-page-card__back-to-users btn" to="/users">Вернуться к списку сотрудников</NavLink>
                        <div className="user-page-card__border">
                            <div className="user-page-card__title">Карточка сотрудника</div>
                            <div className="user-page-card__content">
                                <div className="user-page-card__content-table">
                                    <table>
                                        <tbody>
                                        <tr>
                                                <td>Логин</td>
                                                <td>{login}</td>
                                            </tr>
                                            <tr>
                                                <td>ФИО</td>
                                                <td>{fio}</td>
                                            </tr>
                                            <tr>
                                                <td>Телефон</td>
                                                <td>{phone}</td>
                                            </tr>
                                            <tr>
                                                <td>EMail</td>
                                                <td>{email}</td>
                                            </tr>
                                            <tr>
                                                <td>Дата принятия</td>
                                                <td>{appointmentDate}</td>
                                            </tr>
                                            <tr>
                                                <td>Работодатель</td>
                                                <td>{employer}</td>
                                            </tr>
                                            <tr>
                                                <td>Местонахождение</td>
                                                <td>{location}</td>
                                            </tr>
                                            <tr>
                                                <td>Должность</td>
                                                <td>{postName} (отдел: {postDepartment}, местонахождение: {postLocation})</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {
                                    userDevices.length ?
                                    <div className="user-page-card__user-devices">
                                        <div className="user-page-card__user-devices-title">Оборудование сотрудника</div>
                                        <div className="user-page-card__user-devices-table">
                                            <table>
                                                <tbody>
                                                    {userDevices}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    : null
                                }
                                {
                                    userServicesArr.length ?
                                    <div className="user-page-card__user-services">
                                        <div className="user-page-card__user-services-title">Сервисы сотрудника</div>
                                        <div className="user-page-card__user-services-table">
                                            <table>
                                                <tbody>
                                                    {userServicesArr}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                            <div className="user-page-card__btns">
                                <button className="user-page-card__btn btn" onClick={() => {
                                    props.editUser(props);
                                }}>Редактировать</button>
                            </div>
                        </div>
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let UserPageCardClassComponent = class extends React.Component {
    render() {
        return <UserPageCard {...this.props} />;
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.employersState.employers) || isEmptyObject(state.locationsState.locations)
            || isEmptyObject(state.postDepLocsState.postDepLocs) || isEmptyObject(state.usersState.users)
            || isEmptyObject(state.devicesState.devices) || isEmptyObject(state.brandsState.brands)
            || isEmptyObject(state.accountsState.accounts) || isEmptyObject(state.accountTypesState.accountTypes)) {
            let promiseArr = [];

            if (isEmptyObject(state.employersState.employers)) {
                promiseArr.push(employersGet());
            }

            if (isEmptyObject(state.locationsState.locations)) {
                promiseArr.push(locationsGet());
            }

            if (isEmptyObject(state.postDepLocsState.postDepLocs)) {
                promiseArr.push(postDepLocsGet());
            }

            if (isEmptyObject(state.devicesState.devices)) {
                promiseArr.push(devicesGet());
            }

            if (isEmptyObject(state.brandsState.brands)) {
                promiseArr.push(brandsGet());
            }

            if (isEmptyObject(state.usersState.users)) {
                promiseArr.push(usersGet());
            }

            if (isEmptyObject(state.accountsState.accounts)) {
                promiseArr.push(accountsGet());
            }

            if (isEmptyObject(state.accountTypesState.accountTypes)) {
                promiseArr.push(accountTypesGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'employers') this.props.onEmployersGet(value.data);
                        if (value.config.url === 'locations') this.props.onLocationsGet(value.data);
                        if (value.config.url === 'post_dep_loc_united?status=free') this.props.onPostDepLocsGet(value.data);
                        if (value.config.url === 'devices') this.props.onDevicesGet(value.data);
                        if (value.config.url === 'brands') this.props.onBrandsGet(value.data);
                        if (value.config.url === 'accounts') this.props.onAccountsGet(value.data);
                        if (value.config.url === 'account_types') this.props.onAccountTypesGet(value.data);
                        if (value.config.url === 'users') {
                            this.props.onUsersGet(value.data);
                        }
                    });
                    this.props.onUsersServicesSet(window.store.getState().usersState.users);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.onUsersServicesSet(window.store.getState().usersState.users);
        }
    }
}

let UserPageCardWithRouter = withRouter(UserPageCardClassComponent);

export default UserPageCardWithRouter;