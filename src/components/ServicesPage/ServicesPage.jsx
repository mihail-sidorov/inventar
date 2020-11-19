import React from 'react';
import { Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import InnerPage from '../InnerPage/InnerPage';

let ServicesPage = (props) => {
    return (
        <div className="services-page">
            <div className="services-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPage>
                        Страница сервисов
                    </InnerPage>
                )} />
            </div>
        </div>
    );
}

ServicesPage = authHOC(ServicesPage);

export default ServicesPage;