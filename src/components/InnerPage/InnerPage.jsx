import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

let InnerPageAdmin = (props) => {
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
                                    <NavLink className="inner-page__add-menu-item" to="/softwares/add">Добавить ПО</NavLink>
                                    <NavLink className="inner-page__add-menu-item" to="/employers/add">Добавить работодателя</NavLink>
                                    <NavLink className="inner-page__add-menu-item" to="/locations/add">Добавить местонахождение</NavLink>
                                    <NavLink className="inner-page__add-menu-item" to="/departmentNames/add">Добавить отдел</NavLink>
                                    <NavLink className="inner-page__add-menu-item" to="/posts/add">Добавить должность</NavLink>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inner-page__sidebar-menu-items">
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'devices' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/devices">Оборудование</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'users' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/users">Сотрудники</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'services' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/services">Сервисы</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'softwares' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/softwares">ПО</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'events' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/events">События</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'employers' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/employers">Работодатели</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'locations' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/locations">Местонахождения</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'departmentNames' || props.match.params.page === 'departmentsLocations' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/departmentNames">Отделы</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'posts' || props.match.params.page === 'postsDepartmentsLocations' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/posts">Должности</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'humanResources' || props.match.params.page === 'mentorer' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/humanResources">Отдел кадров</NavLink>
                </div>
            </div>
            <div className="inner-page__content">
                {props.children}
            </div>
        </div>
    );
}

let InnerPageUser = (props) => {
    return (
        <div className="inner-page">
            <div className="inner-page__sidebar-menu">
                <div className="inner-page__sidebar-menu-header">
                    <NavLink className="inner-page__to-main" to="/main">На главную</NavLink>
                </div>
                <div className="inner-page__sidebar-menu-items">
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'devices' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/devices">Оборудование</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'services' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/services">Сервисы</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'events' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/events">События</NavLink>
                    <NavLink className={`inner-page__sidebar-menu-item${props.match.params.page === 'humanResources' || props.match.params.page === 'mentorer' ? ' inner-page__sidebar-menu-item_active' : ''}`} to="/humanResources">Отдел кадров</NavLink>
                </div>
            </div>
            <div className="inner-page__content">
                {props.children}
            </div>
        </div>
    );
}

let InnerPage = (props) => {
    if (props.role === 'admin') return <InnerPageAdmin {...props} />
    if (props.role === 'user' || props.role === 'hr') return <InnerPageUser {...props} />
}

export default withRouter(InnerPage);