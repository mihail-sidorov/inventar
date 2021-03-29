import React from 'react';
import { Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import LocationsContainer from './Locations/LocationsContainer';
import LocationsPagePaginationContainer from './Pagination/LocationsPagePaginationContainer';
import LocationsPageSearchContainer from './Search/LocationsPageSearchContainer';

let LocationsPage = (props) => {
    return (
        <div className="locations-page">
            <div className="locations-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <LocationsPageSearchContainer />
                        <LocationsContainer />
                        <LocationsPagePaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

export default authHOC(LocationsPage);