import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

let InnerPage = (props) => {
    return (
        <div className="inner-page">
            <div className="inner-page__sidebar-menu">
                <div className="inner-page__sidebar-menu-header">
                    <NavLink className="inner-page__to-main" to="/main">На главную</NavLink>
                    <div className="inner-page__add-btn add-btn">
                        <div className="inner-page__add-menu">
                            <div className="inner-page__add-menu-wrapper">
                                <div className="inner-page__add-menu-items">
                                    <NavLink className="inner-page__add-menu-item" to="/devices/add">Добавить оборудование</NavLink>
                                    <NavLink className="inner-page__add-menu-item" to="/users/add">Добавить сотрудника</NavLink>
                                    <NavLink className="inner-page__add-menu-item" to="/services/add">Добавить сервис</NavLink>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inner-page__sidebar-menu-items">
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'devices' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/devices">Оборудование компании</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'users' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/users">Сотрудники компании</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'services' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/services">Сервисы компании</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'events' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/events">События</NavLink>
                </div>
            </div>
            <div className="inner-page__content">
                {props.children}
            </div>
        </div>
    );
}

InnerPage = withRouter(InnerPage);

export default InnerPage;