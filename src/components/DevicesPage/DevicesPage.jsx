import React from 'react';
import { Route } from 'react-router-dom';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import DevicesContainer from './Devices/DevicesContainer';
import DevicesPaginationContainer from './Pagination/DevicesPaginationContainer';
import DevicesSearchContainer from './Search/DevicesSearchContainer';

let DevicesPage = (props) => {
    return (
        <div className="devices-page">
            <div className="devices-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <DevicesSearchContainer searchSwitch={props.searchSwitch} />
                        <DevicesContainer searchOn={props.searchOn} />
                        <DevicesPaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let DevicesPageClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchOn: false};
    }

    searchSwitch(search) {
        this.setState({searchOn: search ? true : false});
    }

    render() {
        return (
            <DevicesPage {...this.props} searchSwitch={this.searchSwitch.bind(this)} searchOn={this.state.searchOn} />
        );
    }
}

export default DevicesPageClassComponent;