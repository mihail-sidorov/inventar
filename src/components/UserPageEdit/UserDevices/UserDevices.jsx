import React from 'react';
import { withRouter } from 'react-router-dom';
import isEmptyObject from '../../../functions/isEmptyObject';
import { brandsGet } from '../../../redux/brandsReducer';
import { categoriesGet } from '../../../redux/categoriesReducer';
import { devicesGet } from '../../../redux/devicesReducer';
import UserDevicesSearchContainer from './UserDevicesSearch/UserDevicesSearchContainer';

let UserDevices = (props) => {
    let userDevices = [];

    for (let prop in props.userDevices) {
        userDevices.push(
            <tr key={prop}>
                <td>{props.brands[props.userDevices[prop].brand_id]?.brand} {props.userDevices[prop].model}</td>
                <td>{props.categories[props.userDevices[prop].category_id]?.category}</td>
                <td>{props.userDevices[prop].inv_number}</td>
                <td>
                    {
                        props.userDevices[prop].status !== 'return' &&
                        <button className="user-devices__unattach-btn" onClick={() => {
                            props.onUnAttachDeviceFromUser(prop);
                        }}>Открепить</button>
                    }
                </td>
            </tr>
        );
    }

    return (
        <div className="user-devices">
            <div className="user-devices__title">Оборудование сотрудника</div>
            <UserDevicesSearchContainer />
            <div className="user-devices__table">
                <table>
                    <tbody>
                        {userDevices}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

let UserDevicesClassComponent = class extends React.Component {
    render() {
        return (
            <UserDevices {...this.props} />
        );
    }

    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.devicesState.devices) || isEmptyObject(state.brandsState.brands)
        || isEmptyObject(state.categoriesState.categories)) {
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

                    this.props.onUserIdSet(this.props.match.params.userId);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            this.props.onUserIdSet(this.props.match.params.userId);
        }
    }
}

let UserDevicesWithRouter = withRouter(UserDevicesClassComponent);

export default UserDevicesWithRouter;