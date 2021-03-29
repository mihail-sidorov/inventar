import React from 'react';
import { Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import ServicesPagePaginationContainer from './Pagination/ServicesPagePaginationContainer';
import ServicesPageSearchContainer from './Search/ServivcesPageSearchContainer';
import ServicesContainer from './Services/ServicesContainer';

let ServicesPage = (props) => {
    return (
        <div className="services-page">
            <div className="services-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <ServicesPageSearchContainer />
                        <ServicesContainer />
                        <ServicesPagePaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

export default authHOC(ServicesPage);