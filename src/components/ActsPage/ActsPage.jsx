import React from 'react';
import { NavLink } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';

let ActsPage = (props) => {
    return (
        <div className="acts-page">
            <NavLink className="acts-page__to-main" to="/main">На главную</NavLink>
            Сраница актов
        </div>
    );
}

ActsPage = authHOC(ActsPage);

export default ActsPage;