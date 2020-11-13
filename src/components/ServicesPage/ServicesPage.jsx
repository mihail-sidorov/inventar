import React from 'react';
import { NavLink } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';

let ServicesPage = (props) => {
    return (
        <div className="services-page">
            <NavLink className="services-page__to-main" to="/main">На главную</NavLink>
            Сраница сервисов
        </div>
    );
}

ServicesPage = authHOC(ServicesPage);

export default ServicesPage;