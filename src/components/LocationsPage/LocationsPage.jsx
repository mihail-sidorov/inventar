import React from 'react';
import { Route } from 'react-router-dom';
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
                        <LocationsPageSearchContainer searchSwitch={props.searchSwitch} />
                        <LocationsContainer searchOn={props.searchOn} />
                        <LocationsPagePaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let LocationsPageClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchOn: false};
    }

    searchSwitch(search) {
        this.setState({searchOn: search ? true : false});
    }

    render() {
        return (
            <LocationsPage {...this.props} searchSwitch={this.searchSwitch.bind(this)} searchOn={this.state.searchOn} />
        );
    }
}

export default LocationsPageClassComponent;