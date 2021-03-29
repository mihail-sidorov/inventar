import React from 'react';
import { Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import EventsContainer from './Events/EventsContainer';
import EventsPageFilterContainer from './Filter/EventsPageFilterContainer';
import EventsPaginationContainer from './Pagination/EventsPaginationContainer';
import EventsSearchContainer from './Search/EventsSearchContainer';

let EventsPage = (props) => {
    return (
        <div className="events-page">
            <div className="events-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <EventsSearchContainer />
                        <EventsPageFilterContainer />
                        <EventsContainer />
                        <EventsPaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

EventsPage = authHOC(EventsPage);

export default authHOC(EventsPage);