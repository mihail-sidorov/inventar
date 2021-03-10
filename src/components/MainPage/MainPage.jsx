import React from 'react';
import { NavLink } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';

let MainPage = (props) => {
    return (
        <div className="main-page">
            <div className="main-page__wrapper section-1">
                <div className="main-page__add-btn add-btn"></div>
                <div className="main-page__items">
                    <NavLink className="main-page__item" to="/devices">Оборудование</NavLink>
                    <NavLink className="main-page__item" to="/users">Сотрудники</NavLink>
                    <NavLink className="main-page__item" to="/services">Сервисы</NavLink>
                    <NavLink className="main-page__item" to="/acts">Акты</NavLink>
                </div>
            </div>
        </div>
    );
}

export default authHOC(MainPage);