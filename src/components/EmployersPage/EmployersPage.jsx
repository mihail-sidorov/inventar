import React from 'react';
import { Route } from 'react-router-dom';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import EmployersContainer from './Employers/EmployersContainer';
import EmployersPagePaginationContainer from './Pagination/EmployersPagePaginationContainer';
import EmployersPageSearchContainer from './Search/EmployersPageSearchContainer';

let EmployersPage = (props) => {
    return (
        <div className="employers-page">
            <div className="employers-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <EmployersPageSearchContainer searchSwitch={props.searchSwitch} />
                        <EmployersContainer searchOn={props.searchOn} />
                        <EmployersPagePaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let EmployersPageClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchOn: false};
    }

    searchSwitch(search) {
        this.setState({searchOn: search ? true : false});
    }

    render() {
        return (
            <EmployersPage {...this.props} searchSwitch={this.searchSwitch.bind(this)} searchOn={this.state.searchOn} />
        );
    }
}

export default EmployersPageClassComponent;