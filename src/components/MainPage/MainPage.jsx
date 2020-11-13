import React from 'react';
import { NavLink } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';

let MainPage = (props) => {
    return (
        <div className="main-page">
            <div className="main-page__items">
                <NavLink className="main-page__item" to="/devices">Оборудование</NavLink><br />
                <NavLink className="main-page__item" to="/workers">Сотрудники</NavLink><br />
                <NavLink className="main-page__item" to="/services">Сервисы</NavLink><br />
            </div>
        </div>
    );
}

MainPage = authHOC(MainPage);

export default MainPage;