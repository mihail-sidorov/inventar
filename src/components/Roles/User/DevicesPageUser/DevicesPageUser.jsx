import React from 'react';
import { Route } from 'react-router';
import isEmptyObject from '../../../../functions/isEmptyObject';
import { brandsGet } from '../../../../redux/brandsReducer';
import { categoriesGet } from '../../../../redux/categoriesReducer';
import { devicesGet } from '../../../../redux/devicesReducer';
import InnerPageContainer from '../../../InnerPage/InnerPageContainer';
import $ from 'jquery';

let DevicesPageUser = (props) => {
    function makeDevicesGroup(userDevices, group) {
        let items = [];
        for (let id in userDevices[group]) {
            items.push(
                <li key={id}>
                    {
                        userDevices[id]
                        ?
                        <div className="device-field" onClick={(e) => {
                            $(e.currentTarget).toggleClass('open');
                            $(e.currentTarget).parent().find('>ul').slideToggle();
                        }}>{props.categories[userDevices[group][id].category_id]?.category}, {props.brands[userDevices[group][id].brand_id]?.brand}, {userDevices[group][id].model}</div>
                        :
                        <div>{props.categories[userDevices[group][id].category_id]?.category}, {props.brands[userDevices[group][id].brand_id]?.brand}, {userDevices[group][id].model}</div>
                    }
                    {makeDevicesGroup(userDevices, id)}
                </li>
            );
        }
        return(
            items.length > 0 ? <ul>{items}</ul> : null
        );
    }

    return(
        <div className="devices-page-user">
            <div className="devices-page-user__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPageContainer>
                        <div className="devices-page-user__title">Оборудование сотрудника</div>
                        <div className="devices-page-user__border">
                            <div className="devices-page-user__content">
                                {
                                    Object.keys(props.userDevices).length ? makeDevicesGroup(props.userDevices, 'null') : 'Список данных пуст'
                                }
                            </div>
                        </div>
                    </InnerPageContainer>
                } />
            </div>
        </div>
    );
}

let DevicesPageUserClassComponent = class extends React.Component {
    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.devicesState.devices) || isEmptyObject(state.brandsState.brands) || isEmptyObject(state.categoriesState.categories)) {
            let promiseArr = [];

            if (isEmptyObject(state.devicesState.devices)) {
                promiseArr.push(devicesGet());
            }
            if (isEmptyObject(state.brandsState.brands)) {
                promiseArr.push(brandsGet());
            }
            if (isEmptyObject(state.categoriesState.categories)) {
                promiseArr.push(categoriesGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'devices') this.props.onDevicesGet(value.data);
                        if (value.config.url === 'brands') this.props.onBrandsGet(value.data);
                        if (value.config.url === 'categories') this.props.onCategoriesGet(value.data);
                    });
                    this.props.onUserDevicesSet(this.props.userId);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.onUserDevicesSet(this.props.userId);
        }
    }

    render() {
        return <DevicesPageUser {...this.props} />
    }
}

export default DevicesPageUserClassComponent;