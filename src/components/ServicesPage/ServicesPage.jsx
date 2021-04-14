import React from 'react';
import { Route } from 'react-router-dom';
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
                        <ServicesPageSearchContainer searchSwitch={props.searchSwitch} />
                        <ServicesContainer searchOn={props.searchOn} />
                        <ServicesPagePaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let ServicesPageClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchOn: false};
    }

    searchSwitch(search) {
        this.setState({searchOn: search ? true : false});
    }

    render() {
        return (
            <ServicesPage {...this.props} searchSwitch={this.searchSwitch.bind(this)} searchOn={this.state.searchOn} />
        );
    }
}

export default ServicesPageClassComponent;