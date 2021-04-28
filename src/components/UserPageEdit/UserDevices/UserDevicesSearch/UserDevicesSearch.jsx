import React from 'react';

let UserDevicesSearch = (props) => {
    let searchDevicesArr = [];

    for (let id in props.searchDevices) {
        searchDevicesArr.push(
            <div className="user-devices-search__item" key={id}>
                <span className="user-devices-search__item-part-inform">{`${props.brands[props.searchDevices[id].brand_id]?.brand} ${props.searchDevices[id].model}`}</span>&nbsp;
                <span className="user-devices-search__item-part-inform">{props.categories[props.searchDevices[id].category_id]?.category} {props.searchDevices[id].inv_number}</span>&nbsp;
                <button className="user-devices-search__attach-btn" onClick={() => {
                    props.onAttachDeviceToUser(props.userId, id);
                }}>Прикрепить</button>
            </div>
        );
    }

    return (
        <div className="user-devices-search">
            <div className="user-devices-search__input search">
                <input type="text" value={props.search} onChange={(e) => {
                    props.searchSwitch(e.currentTarget.value);
                    props.onUserDevicesChangeSearch(e.currentTarget.value);
                }} />
            </div>
            <div className="user-devices-search__items">
                {
                    searchDevicesArr.length ? searchDevicesArr : props.searchOn ? 'По запросу поиска ничего не найдено' : ''
                }
            </div>
        </div>
    );
}

let UserDevicesSearchClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchOn: false};
    }

    searchSwitch(search) {
        this.setState({searchOn: search ? true : false});
    }

    render() {
        return (
            <UserDevicesSearch {...this.props} searchSwitch={this.searchSwitch.bind(this)} searchOn={this.state.searchOn} />
        );
    }
}

export default UserDevicesSearchClassComponent;