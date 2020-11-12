import React from 'react';
import authHOC from '../../HOC/authHOC';

let MainPage = (props) => {
    return (
        <div className="main-page">
            Главная страница
        </div>
    );
}

MainPage = authHOC(MainPage);

export default MainPage;