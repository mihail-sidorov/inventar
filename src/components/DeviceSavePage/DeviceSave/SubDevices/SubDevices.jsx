import React from 'react';
import isEmptyObject from '../../../../functions/isEmptyObject';
import { devicesGet } from '../../../../redux/devicesReducer';

let SubDevices = (props) => {
    let subDevicesSearchArr = [];
    let subDevicesArr = [];

    for (let id in props.subDevicesSearch) {
        let brand = props.brands[props.subDevicesSearch[id].brand_id] &&
            props.brands[props.subDevicesSearch[id].brand_id].brand ? props.brands[props.subDevicesSearch[id].brand_id].brand : null;

        subDevicesSearchArr.push(
            <div className="sub-devices__search-item" key={id}>
                <span className="sub-devices__search-item-part-inform">{brand} {props.subDevicesSearch[id].model}</span>
                <span className="sub-devices__search-item-part-inform">{props.subDevicesSearch[id].inv_number}</span>
                <button className="sub-devices__search-item-attach-btn" onClick={() => {
                    props.attachDeviceToDevice(props.deviceId, id);
                }}>Прикрепить</button>
            </div>
        );
    }

    for (let id in props.subDevices) {
        let brand = props.brands[props.subDevices[id].brand_id] &&
            props.brands[props.subDevices[id].brand_id].brand ? props.brands[props.subDevices[id].brand_id].brand : null;

        subDevicesArr.push(
            <tr key={id}>
                <td>{brand} {props.subDevices[id].model}</td>
                <td>{props.subDevices[id].inv_number}</td>
                <td><button className="ub-devices__table-unattach-btn" onClick={() => {
                    props.unAttachDeviceFromDevice(id);
                }}>Открепить</button></td>
            </tr>
        );
    }

    return (
        <div className="sub-devices">
            <div className="sub-devices__title">Составное оборудование</div>
            <div className="sub-devices__search">
                <div className="sub-devices__search-input search"><input type="text" value={props.search} onChange={(e) => {
                    props.changeSubDevicesSearch(e.currentTarget.value);
                }} /></div>
                <div className="sub-devices__search-items">
                    {subDevicesSearchArr}
                </div>
            </div>
            <div className="sub-devices__table">
                <table>
                    <tbody>
                        {subDevicesArr}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

let SubDevicesClassComponent = class extends React.Component {
    render() {
        return (
            <SubDevices {...this.props} />
        );
    }

    componentDidMount() {
        this.props.makeSubDevicesSearch();
        this.props.makeSubDevices();
    }
}

export default SubDevicesClassComponent;