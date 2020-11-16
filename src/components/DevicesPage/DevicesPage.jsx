import React from 'react';
import { NavLink } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import DevicesContainer from './Devices/DevicesContainer';
import DevicesSearchContainer from './Search/DevicesSearchContainer';

let DevicesPage = (props) => {
    return (
        <div className="devices-page">
            <NavLink className="devices-page__to-main" to="/main">На главную</NavLink>
            <DevicesSearchContainer />
            <DevicesContainer />
        </div>
    );
}

DevicesPage = authHOC(DevicesPage);

export default DevicesPage;