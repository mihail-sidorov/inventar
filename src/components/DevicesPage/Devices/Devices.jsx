import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { brandsGet } from '../../../redux/brandsReducer';
import { devicesGet } from '../../../redux/devicesReducer';
import { usersGet } from '../../../redux/usersReducer';
import DeviceContainer from './Device/DeviceContainer';

let Devices = (props) => {
    let devicesArr = [];

    for (let id in props.devices) {
        let Device = DeviceContainer(id);
        devicesArr.push(<Device key={id} />);
    }

    return (
        <div className="devices">
            <table border="1">
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Инвентарный номер</th>
                        <th>Сотрудник</th>
                    </tr>
                </thead>
                <tbody>
                    {devicesArr}
                </tbody>
            </table>
        </div>
    );
}

let DevicesClassComponent = class extends React.Component {
    componentDidMount() {
        let state = window.store.getState();

        if (isEmptyObject(state.devicesState.devices) || isEmptyObject(state.usersState.users) || isEmptyObject(state.brandsState.brands)) {
            let promiseArr = [];

            if (isEmptyObject(state.devicesState.devices)) {
                promiseArr.push(devicesGet());
            }

            if (isEmptyObject(state.usersState.users)) {
                promiseArr.push(usersGet());
            }

            if (isEmptyObject(state.brandsState.brands)) {
                promiseArr.push(brandsGet());
            }

            Promise.all(promiseArr)
                .then((response) => {
                    response.forEach((value) => {
                        if (value.config.url === 'devices') this.props.onDevicesGet(value.data);
                        if (value.config.url === 'users') this.props.onUsersGet(value.data);
                        if (value.config.url === 'brands') this.props.onBrandsGet(value.data);
                    });

                    this.props.onMakeShortDevices();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <Devices {...this.props} />
        );
    }
}

export default DevicesClassComponent;