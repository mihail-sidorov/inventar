import React from 'react';

let SubDevices = (props) => {
    let subDevicesSearchArr = [];
    let subDevicesArr = [];

    for (let id in props.subDevicesSearch) {
        let brand = props.brands[props.subDevicesSearch[id].brand_id] &&
            props.brands[props.subDevicesSearch[id].brand_id].brand ? props.brands[props.subDevicesSearch[id].brand_id].brand : null;

        subDevicesSearchArr.push(
            <div className="sub-devices__search-item" key={id}>
                <span className="sub-devices__search-item-part-inform">{brand} {props.subDevicesSearch[id].model}</span>
                <span className="sub-devices__search-item-part-inform">{props.categories[props.subDevicesSearch[id].category_id]?.category} {props.subDevicesSearch[id].inv_number}</span>
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
                <td>{props.categories[props.subDevices[id].category_id]?.category}</td>
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
                    props.searchSwitch(e.currentTarget.value);
                    props.changeSubDevicesSearch(e.currentTarget.value);
                }} /></div>
                <div className="sub-devices__search-items">
                    {
                        subDevicesSearchArr.length ? subDevicesSearchArr : props.searchOn ? 'По запросу поиска ничего не найдено' : ''
                    }
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
    constructor(props) {
        super(props);
        this.state = {searchOn: false};
    }

    searchSwitch(search) {
        this.setState({searchOn: search ? true : false});
    }

    render() {
        return (
            <SubDevices {...this.props} searchSwitch={this.searchSwitch.bind(this)} searchOn={this.state.searchOn} />
        );
    }

    componentDidMount() {
        this.props.makeSubDevicesSearch();
        this.props.makeSubDevices();
    }
}

export default SubDevicesClassComponent;