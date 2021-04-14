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
                        <EventsSearchContainer searchSwitch={props.searchSwitch} />
                        <EventsPageFilterContainer />
                        <EventsContainer searchOn={props.searchOn} />
                        <EventsPaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let EventsPageClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchOn: false};
    }

    searchSwitch(search) {
        this.setState({searchOn: search ? true : false});
    }

    render() {
        return (
            <EventsPage {...this.props} searchSwitch={this.searchSwitch.bind(this)} searchOn={this.state.searchOn} />
        );
    }
}

export default authHOC(EventsPageClassComponent);