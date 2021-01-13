import React from 'react';
import { Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import InnerPage from '../InnerPage/InnerPageContainer';
import ServicesContainer from './Services/ServicesContainer';

let ServicesPage = (props) => {
    return (
        <div className="services-page">
            <div className="services-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPage>
                        <ServicesContainer />
                    </InnerPage>
                )} />
            </div>
        </div>
    );
}

ServicesPage = authHOC(ServicesPage);

export default ServicesPage;