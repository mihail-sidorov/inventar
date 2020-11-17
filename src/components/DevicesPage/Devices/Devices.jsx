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
                    if (response[0]) this.props.onDevicesGet(response[0].data);
                    if (response[1]) this.props.onUsersGet(response[1].data);
                    if (response[2]) this.props.onBrandsGet(response[2].data);

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