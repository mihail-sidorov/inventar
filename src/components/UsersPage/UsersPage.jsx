import React from 'react';
import { NavLink } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';

let UsersPage = (props) => {
    return (
        <div className="users-page">
            <NavLink className="users-page__to-main" to="/main">На главную</NavLink>
            Сраница сотрудников
        </div>
    );
}

UsersPage = authHOC(UsersPage);

export default UsersPage;