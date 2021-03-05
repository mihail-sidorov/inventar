import React from 'react';
import InnerPage from '../InnerPage/InnerPage';
import { NavLink, Route, withRouter } from 'react-router-dom';
import { accountsGet } from '../../redux/accountsReducer';
import isEmptyObject from '../../functions/isEmptyObject';
import { accountTypesGet } from '../../redux/accountTypesReducer';
import { departmentsGet } from '../../redux/departmentsReducer';
import { usersGet } from '../../redux/usersReducer';
import { getAttached } from '../../redux/servicePageEditReducer';

let ServicePageCard = (props) => {
    let serviceId, type, login, password, url, comments, attachedDepartmentsArr, attachedUsersArr;

    serviceId = props.match.params.serviceId;
    type = props.serviceTypes[props.services[serviceId]?.account_type_id]?.account_type;
    login = props.services[serviceId]?.login;
    password = props.services[serviceId]?.password;
    url = props.services[serviceId]?.url;
    comments = props.services[serviceId]?.comments;

    attachedDepartmentsArr = [];
    props.serviceAttached.departments.forEach((depId) => {
        attachedDepartmentsArr.push(
            <tr key={depId}>
                <td>Отдел {props.departments[depId].department} ({props.departments[depId].location})</td>
            </tr>
        );
    });

    attachedUsersArr = [];
    props.serviceAttached.users.forEach((usId) => {
        attachedUsersArr.push(
            <tr key={usId}>
                <td>{props.users[usId].full_name}</td>
            </tr>
        );
    });

    return(
        <div className="service-page-card">
            <div className="service-page-card__wrapper section-2">
                <Route path="/:page/card" render={() => (
                    <InnerPage>
                        <NavLink className="service-page-card__back-to-services btn" to="/services">Вернуться к списку сервисов</NavLink>
                        <div className="service-page-card__border">
                            <div className="service-page-card__title">Карточка сервиса</div>
                            <div className="service-page-card__content">
                                <div className="service-page-card__content-table">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Тип</td>
                                                <td>{type}</td>
                                            </tr>
                                            <tr>
                                                <td>Логин</td>
                                                <td>{login}</td>
                                            </tr>
                                            <tr>
                                                <td>Пароль</td>
                                                <td>{password}</td>
                                            </tr>
                                            <tr>
                                                <td>Адрес сервиса</td>
                                                <td>{url}</td>
                                            </tr>
                                            <tr>
                                                <td>Комментарии</td>
                                                <td>{comments}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {
                                    attachedDepartmentsArr.length ?
                                    <div className="service-page-card__attached-departments">
                                        <div className="service-page-card__attached-departments-title">Прикрепленные отделы</div>
                                        <div className="service-page-card__attached-departments-table">
                                            <table>
                                                <tbody>
                                                    {attachedDepartmentsArr}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    : null
                                }
                                {
                                    attachedUsersArr.length ?
                                    <div className="service-page-card__attached-users">
                                        <div className="service-page-card__attached-users-title">Прикрепленные пользователи</div>
                                        <div className="service-page-card__attached-users-table">
                                            <table>
                                                <tbody>
                                                    {attachedUsersArr}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    : null
                                }
                            </div>
                            <div className="service-page-card__btns">
                                <button className="service-page-card__btn btn" onClick={() => {
                                    props.editService(props);
                                }}>Редактировать</button>
                            </div>
                        </div>
                    </InnerPage>
                )} />
            </div>
        </div>
    );
};

let ServicePageCardClassComponent = class extends React.Component {
    render() {
        return(
            <ServicePageCard {...this.props} />
        );
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.accountsState.accounts) || isEmptyObject(state.accountTypesState.accountTypes)
        || isEmptyObject(state.departmentsState.departments) || isEmptyObject(state.usersState.users)) {
            let promiseArr = [];
            if (isEmptyObject(state.accountsState.accounts)) {
                promiseArr.push(accountsGet());
            }
            if (isEmptyObject(state.accountTypesState.accountTypes)) {
                promiseArr.push(accountTypesGet());
            }
            if (isEmptyObject(state.departmentsState.departments)) {
                promiseArr.push(departmentsGet());
            }
            if (isEmptyObject(state.usersState.users)) {
                promiseArr.push(usersGet());
            }
            promiseArr.push(getAttached(this.props.match.params.serviceId));
            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'accounts') this.props.accountsSet(value.data);
                        if (value.config.url === 'account_types') this.props.accountTypesSet(value.data);
                        if (value.config.url === 'dep_loc_united') this.props.departmentsSet(value.data);
                        if (value.config.url === 'users') this.props.usersSet(value.data);
                        if (value.config.url === `account_owners?accountId=${this.props.match.params.serviceId}`) this.props.setServiceAttached(value.data);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            getAttached(this.props.match.params.serviceId)
                .then((response) => {
                    this.props.setServiceAttached(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}

let ServicePageCardWithRouter = withRouter(ServicePageCardClassComponent);

export default ServicePageCardWithRouter;