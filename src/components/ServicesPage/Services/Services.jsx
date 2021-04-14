import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { accountsGet } from '../../../redux/accountsReducer';
import { accountTypesGet } from '../../../redux/accountTypesReducer';
import { departmentsGet } from '../../../redux/departmentsReducer';
import { usersGet } from '../../../redux/usersReducer';
import ServiceContainer from './Service/ServiceContainer';

let Services = (props) => {
    let servicesArr = [];

    for (let id in props.services) {
        let Service = ServiceContainer(id);
        servicesArr.push(<Service key={id} />);
    }

    return (
        <div className="services">
            <table border="1">
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Логин</th>
                        <th>Пароль</th>
                        <th>Адрес сервиса</th>
                        <th>Комментарии</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        servicesArr.length ? servicesArr :
                        <tr>
                            <td colSpan="4">
                                {props.searchOn ? 'По запросу поиска ничего не найдено' : 'Список данных пуст'}
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

let ServicesClassComponent = class extends React.Component {
    render() {
        return <Services {...this.props} />;
    }

    loadServicesData() {
        let state = window.store.getState();

        if (isEmptyObject(state.accountsState.accounts) || isEmptyObject(state.accountTypesState.accountTypes) || isEmptyObject(state.departmentsState.departments) || isEmptyObject(state.usersState.users)) {
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

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'accounts') {
                            this.props.accountsSet(value.data);
                            this.props.attachedSet(window.store.getState().accountsState.accounts);
                        }
                        if (value.config.url === 'account_types') this.props.accountTypesSet(value.data);
                        if (value.config.url === 'dep_loc_united') this.props.departmentsSet(value.data);
                        if (value.config.url === 'users') this.props.usersSet(value.data);
                    });

                    this.props.shortServicesSet();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.attachedSet(state.accountsState.accounts);
            this.props.shortServicesSet();
        }
    }

    componentDidMount() {
        this.loadServicesData();
    }
}

export default ServicesClassComponent;