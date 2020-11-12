import React from 'react';
import authHOC from '../../HOC/authHOC';

let MainPage = (props) => {
    return (
        <div className="main-page">
            Авторизованы на главной странице!
        </div>
    );
}

MainPage = authHOC(MainPage);

export default MainPage;