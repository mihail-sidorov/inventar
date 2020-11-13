import React from 'react';
import { NavLink } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';

let WorkersPage = (props) => {
    return (
        <div className="workers-page">
            <NavLink className="workers-page__to-main" to="/main">На главную</NavLink>
            Сраница сотрудников
        </div>
    );
}

WorkersPage = authHOC(WorkersPage);

export default WorkersPage;