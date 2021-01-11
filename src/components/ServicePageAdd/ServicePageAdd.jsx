import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import InnerPage from '../InnerPage/InnerPage';

let ServicePageAdd = (props) => {
    return (
        <div className="service-page-add">
            <div className="service-page-add__wrapper section-2">
                <Route path="/:page" render={() => 
                    <InnerPage>
                        <NavLink className="service-page-add__back-to-services btn" to="/services">Вернуться к списку сервисов</NavLink>
                        <div className="service-page-add__form-container">
                            <div className="service-page-add__title">Добавление сервиса</div>
                        </div>
                    </InnerPage>
                } />
            </div>
        </div>
    );
}

export default ServicePageAdd;