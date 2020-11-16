import React from 'react';
import isEmptyObject from '../../../functions/isEmptyObject';
import { devicesGet } from '../../../redux/devicesReducer';
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
        if (isEmptyObject(this.props.devices)) {
            devicesGet()
                .then((response) => {
                    this.props.onDevicesGet(response.data);
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