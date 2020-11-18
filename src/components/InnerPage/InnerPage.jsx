import React from 'react';
import { NavLink } from 'react-router-dom';

let InnerPage = (props) => {
    return (
        <div className="inner-page">
            <div className="inner-page__sidebar-menu">
                <div className="inner-page__sidebar-menu-header">
                    <NavLink className="inner-page__to-main" to="/main">На главную</NavLink>
                    <div className="inner-page__add-btn add-btn"></div>
                </div>
                <div className="inner-page__sidebar-menu-items">
                    <NavLink className="inner-page__sidebar-menu-item" to="/devices">Оборудование компании</NavLink>
                    <NavLink className="inner-page__sidebar-menu-item" to="/users">Сотрудники компании</NavLink>
                    <NavLink className="inner-page__sidebar-menu-item" to="/services">Сервисы компании</NavLink>
                    <NavLink className="inner-page__sidebar-menu-item" to="/acts">Акты</NavLink>
                </div>
            </div>
            <div className="inner-page__content">
                {props.children}
            </div>
        </div>
    );
}

export default InnerPage;