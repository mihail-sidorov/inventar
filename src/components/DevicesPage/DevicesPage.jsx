import React from 'react';
import { NavLink } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';

let DevicesPage = (props) => {
    return (
        <div className="devices-page">
            <NavLink className="devices-page__to-main" to="/main">На главную</NavLink>
            Страница оборудования
        </div>
    );
}

DevicesPage = authHOC(DevicesPage);

export default DevicesPage;