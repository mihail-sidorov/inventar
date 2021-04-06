import React from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import isEmptyObject from '../../functions/isEmptyObject';
import { brandsGet } from '../../redux/brandsReducer';
import { categoriesGet } from '../../redux/categoriesReducer';
import { devicesGet } from '../../redux/devicesReducer';
import { locationsGet } from '../../redux/locationsReducer';
import { responsiblesGet } from '../../redux/responsiblesReducer';
import { statusesGet } from '../../redux/statusesReducer';
import { suppliersGet } from '../../redux/suppliersReducer';
import { usersGet } from '../../redux/usersReducer';
import InnerPageContainer from '../InnerPage/InnerPageContainer';

let DevicePageCard = (props) => {
    let device, categoryObj, category, specificationsFields, model, invNumber, price, datePurchase, dateWarrantyEnd, responsible, brand, supplier, location, subDevicesArr, status, user, SN, order_number, comments;

    if (props.devices[props.match.params.deviceId] !== undefined) {
        device = props.devices[props.match.params.deviceId];

        if (props.categories[device.category_id] !== undefined) {
            category = props.categories[device.category_id].category;

            specificationsFields = [];
            categoryObj = props.categories[device.category_id];
            for (let property in categoryObj.schema.properties) {
                specificationsFields.push(
                    <tr key={property}>
                        <td>{categoryObj.schema.properties[property].title}</td>
                        <td>
                            {
                                (device.specifications[property] instanceof Array) ? device.specifications[property].join(', ') : device.specifications[property]
                            }
                        </td>
                    </tr>
                );
            }
        }

        SN = device.SN;
        order_number = device.order_number;
        model = device.model;
        invNumber = device.inv_number;
        price = device.price;
        comments = device.comments;

        let date = new Date(device.date_purchase);
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
        datePurchase = date.getUTCFullYear() + '-' + month + '-' + day;

        date = new Date(device.date_warranty_end);
        month = Number(date.getUTCMonth()) + 1;
        if (month < 10) {
            month = '0' + String(month);
        }
        else {
            month = String(month);
        }
        day = Number(date.getUTCDate());
        if (day < 10) {
            day = '0' + String(day);
        }
        else {
            day = String(day);
        }
        dateWarrantyEnd = date.getUTCFullYear() + '-' + month + '-' + day;

        if (props.users[device.user_id] !== undefined) {
            responsible = props.users[device.user_id].full_name;
        }

        if (props.brands[device.brand_id] !== undefined) {
            brand = props.brands[device.brand_id].brand;
        }

        if (props.suppliers[device.supplier_id] !== undefined) {
            supplier = props.suppliers[device.supplier_id].supplier;
        }

        if (props.locations[device.location_id] !== undefined) {
            location = props.locations[device.location_id].location;
        }

        subDevicesArr = [];
        for (let prop in props.devices) {
            if (props.devices[prop].parent_id == device.id) {
                subDevicesArr.push(
                    <tr key={props.devices[prop].id} onClick={() => {
                        props.goToSubDeviceCard(prop, props.history);
                    }}>
                        <td>{props.brands[props.devices[prop].brand_id]?.brand} {props.devices[prop].model}</td>
                        <td>{props.devices[prop].inv_number}</td>
                    </tr>
                );
            }
        }

        status = props.statuses[device.status_id]?.status_rus;
        user = props.users[device.user_id]?.full_name;
    }

    return(
        <div className="device-page-card">
            <div className="device-page-card__wrapper section-2">
                <Route exact path="/:page/card/:deviceId" render={() => (
                    <InnerPageContainer>
                        <NavLink className="device-page-card__back-to-devices btn" to="/devices">Вернуться к списку оборудования</NavLink>
                        <div className="device-page-card__border">
                            <div className="device-page-card__title">Карточка оборудования</div>
                            <div className="device-page-card__content">
                                <div className="device-page-card__content-table">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Категория</td>
                                                <td>{category}</td>
                                            </tr>
                                            {specificationsFields}
                                            {
                                                categoryObj && categoryObj.sub_devices === null &&
                                                <>
                                                    <tr>
                                                        <td>Серийный номер</td>
                                                        <td>{SN}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Номер заказа</td>
                                                        <td>{order_number}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Модель</td>
                                                        <td>{model}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Инвентарный номер</td>
                                                        <td>{invNumber}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Закупочная цена</td>
                                                        <td>{price}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Дата покупки</td>
                                                        <td>{datePurchase}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Дата окончания гарантии</td>
                                                        <td>{dateWarrantyEnd}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Марка</td>
                                                        <td>{brand}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Поставщик</td>
                                                        <td>{supplier}</td>
                                                    </tr>
                                                </>
                                            }
                                            <tr>
                                                <td>Ответственный</td>
                                                <td>{responsible}</td>
                                            </tr>
                                            <tr>
                                                <td>Местонахождение</td>
                                                <td>{location}</td>
                                            </tr>
                                            <tr>
                                                <td>Комментарии</td>
                                                <td>{comments}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="device-page-card__btns">
                                <button className="device-page-card__btn btn" onClick={() => {
                                    props.editDevice(props);
                                }}>Редактировать</button>
                            </div>
                        </div>
                        {
                            subDevicesArr && subDevicesArr.length ?
                            <div className="device-page-card__border">
                                <div className="device-page-card__title">Составное оборудование</div>
                                <div className="device-page-card__content">
                                    <div className="device-page-card__content-table">
                                        <table>
                                            <tbody>
                                                {subDevicesArr}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                        <div className="device-page-card__border">
                            <div className="device-page-card__title">Статус оборудования</div>
                            <div className="device-save__status-container-inform">
                                Статус: {status}
                                <br/>
                                Ответственный: {user}
                            </div>
                        </div>
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let DevicePageCardClassComponent = class extends React.Component {
    render() {
        return <DevicePageCard {...this.props} />;
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.usersState.users) || isEmptyObject(state.responsiblesState.responsibles) || isEmptyObject(state.brandsState.brands) || isEmptyObject(state.categoriesState.categories) || isEmptyObject(state.suppliersState.suppliers) || isEmptyObject(state.statusesState.statuses) || isEmptyObject(state.locationsState.locations) || isEmptyObject(state.devicesState.devices)) {
            let promiseArr = [];

            if (isEmptyObject(state.usersState.users)) {
                promiseArr.push(usersGet());
            }
            if (isEmptyObject(state.responsiblesState.responsibles)) {
                promiseArr.push(responsiblesGet());
            }
            if (isEmptyObject(state.brandsState.brands)) {
                promiseArr.push(brandsGet());
            }
            if (isEmptyObject(state.categoriesState.categories)) {
                promiseArr.push(categoriesGet());
            }
            if (isEmptyObject(state.suppliersState.suppliers)) {
                promiseArr.push(suppliersGet());
            }
            if (isEmptyObject(state.statusesState.statuses)) {
                promiseArr.push(statusesGet());
            }
            if (isEmptyObject(state.locationsState.locations)) {
                promiseArr.push(locationsGet());
            }
            if (isEmptyObject(state.devicesState.devices)) {
                promiseArr.push(devicesGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'users') this.props.onUsersGet(value.data);
                        if (value.config.url === 'warehouseResponsible') this.props.onResponsiblesGet(value.data);
                        if (value.config.url === 'brands') this.props.onBrandsGet(value.data);
                        if (value.config.url === 'categories') this.props.onCategoriesGet(value.data);
                        if (value.config.url === 'suppliers') this.props.onSuppliersGet(value.data);
                        if (value.config.url === 'statuses') this.props.onStatusesGet(value.data);
                        if (value.config.url === 'locations') this.props.onLocationsGet(value.data);
                        if (value.config.url === 'devices') this.props.onDevicesGet(value.data, this.props);
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}

let DevicePageCardWithRouter = withRouter(DevicePageCardClassComponent);

export default DevicePageCardWithRouter;