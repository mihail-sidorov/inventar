import React from 'react';
import { NavLink } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import DevicesContainer from './Devices/DevicesContainer';
import DevicesPaginationContainer from './Pagination/DevicesPaginationContainer';
import DevicesSearchContainer from './Search/DevicesSearchContainer';

let DevicesPage = (props) => {
    return (
        <div className="devices-page">
            <NavLink className="devices-page__to-main" to="/main">На главную</NavLink>
            <DevicesSearchContainer />
            <DevicesContainer />
            <DevicesPaginationContainer />
        </div>
    );
}

DevicesPage = authHOC(DevicesPage);

export default DevicesPage;