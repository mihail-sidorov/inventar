import React from 'react';
import { Route } from 'react-router';
import isEmptyObject from '../../../../functions/isEmptyObject';
import { accountsGet } from '../../../../redux/accountsReducer';
import { accountTypesGet } from '../../../../redux/accountTypesReducer';
import { userServicesGet } from '../../../../redux/servicesPageUserReducer';
import InnerPageContainer from '../../../InnerPage/InnerPageContainer';

let ServicesPageUser = (props) => {
    let accountsArr = [];

    for (let id in props.userServices) {
        accountsArr.push(
            <tr key={id}>
                <td>{props.accountTypes[props.accounts[props.userServices[id].account_id]?.account_type_id]?.account_type}</td>
                <td>{props.accounts[props.userServices[id].account_id]?.login}</td>
                <td>{props.accounts[props.userServices[id].account_id]?.password}</td>
                <td>{props.accounts[props.userServices[id].account_id]?.url}</td>
                <td>{props.accounts[props.userServices[id].account_id]?.comments}</td>
            </tr>
        );
    }

    return(
        <div className="services-page-user">
            <div className="services-page-user__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPageContainer>
                        <div className="services-page-user__border">
                            <div className="services-page-user__title">Сервисы сотрудника</div>
                            <div className="services-page-user__content">
                                <div className="services-page-user__content-table">
                                    <table>
                                        <tbody>
                                            {accountsArr}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </InnerPageContainer>
                } />
            </div>
        </div>
    );
}

let ServicesPageUserClassComponent = class extends React.Component {
    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.servicesPageUserState.userServices) || isEmptyObject(state.accountsState.accounts)
        || isEmptyObject(state.accountTypesState.accountTypes)) {
            let promiseArr = [];

            if (isEmptyObject(state.servicesPageUserState.userServices)) {
                promiseArr.push(userServicesGet(this.props.userId));
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
                        if (value.config.url === `account_owners?userId=${this.props.userId}`) this.props.userServicesSet(value.data);
                        if (value.config.url === 'accounts') this.props.accountsSet(value.data);
                        if (value.config.url === 'account_types') this.props.accountTypesSet(value.data);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return <ServicesPageUser {...this.props} />;
    }
}

export default ServicesPageUserClassComponent;