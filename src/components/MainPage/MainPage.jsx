import React from 'react';
import { NavLink } from 'react-router-dom';

let MainPageAdmin = (props) => {
    return (
        <div className="main-page">
            <div className="main-page__wrapper section-1">
                <div className="main-page__add-btn add-btn">
                    <div className="main-page__add-menu">
                        <div className="main-page__add-menu-wrapper">
                            <div className="main-page__add-menu-items">
                                <NavLink className="main-page__add-menu-item" to="/devices/add">Добавить оборудование</NavLink>
                                <NavLink className="main-page__add-menu-item" to="/users/add">Добавить сотрудника</NavLink>
                                <NavLink className="main-page__add-menu-item" to="/services/add">Добавить сервис</NavLink>
                                <NavLink className="main-page__add-menu-item" to="/softwares/add">Добавить ПО</NavLink>
                                <NavLink className="main-page__add-menu-item" to="/employers/add">Добавить работодателя</NavLink>
                                <NavLink className="main-page__add-menu-item" to="/locations/add">Добавить местонахождение</NavLink>
                                <NavLink className="main-page__add-menu-item" to="/departmentNames/add">Добавить отдел</NavLink>
                                <NavLink className="main-page__add-menu-item" to="/posts/add">Добавить должность</NavLink>
                            </div>                                
                        </div>
                    </div>
                </div>
                <div className="main-page__items">
                    <NavLink className="main-page__item" to="/devices">Оборудование</NavLink>
                    <NavLink className="main-page__item" to="/users">Сотрудники</NavLink>
                    <NavLink className="main-page__item" to="/services">Сервисы</NavLink>
                    <NavLink className="main-page__item" to="/softwares">ПО</NavLink>
                    <NavLink className="main-page__item" to="/events">События</NavLink>
                    <NavLink className="main-page__item" to="/employers">Работодатели</NavLink>
                    <NavLink className="main-page__item" to="/locations">Местонахождения</NavLink>
                    <NavLink className="main-page__item" to="/departmentNames">Отделы</NavLink>
                    <NavLink className="main-page__item" to="/posts">Должности</NavLink>
                    <NavLink className="main-page__item" to="/humanResources">Отдел кадров</NavLink>
                </div>
            </div>
        </div>
    );
}

let MainPageUser = (props) => {
    return (
        <div className="main-page">
            <div className="main-page__wrapper section-1">
                <div className="main-page__items">
                    <NavLink className="main-page__item" to="/devices">Оборудование</NavLink>
                    <NavLink className="main-page__item" to="/services">Сервисы</NavLink>
                    <NavLink className="main-page__item" to="/events">События</NavLink>
                    <NavLink className="main-page__item" to="/humanResources">Отдел кадров</NavLink>
                </div>
            </div>
        </div>
    );
}

let MainPage = (props) => {
    if (props.role === 'admin') return <MainPageAdmin />;
    if (props.role === 'user' || props.role === 'hr') return <MainPageUser />;
}

export default MainPage;