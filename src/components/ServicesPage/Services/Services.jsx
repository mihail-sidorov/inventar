import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { accountsGet } from '../../../redux/accountsReducer';
import { accountTypesGet } from '../../../redux/accountTypesReducer';
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
                    </tr>
                </thead>
                <tbody>
                    {servicesArr}
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

        if (isEmptyObject(state.accountsState.accounts) || isEmptyObject(state.accountTypesState.accountTypes)) {
            let promiseArr = [];

            if (isEmptyObject(state.accountsState.accounts)) {
                promiseArr.push(accountsGet());
            }

            if (isEmptyObject(state.accountTypesState.accountTypes)) {
                promiseArr.push(accountTypesGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'accounts') this.props.accountsSet(value.data);
                        if (value.config.url === 'account_types') this.props.accountTypesSet(value.data);
                    });

                    this.props.shortServicesSet();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.shortServicesSet();
        }
    }

    componentDidMount() {
        this.loadServicesData();
    }
}

export default ServicesClassComponent;