import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import DepartmentsLocationsContainer from './DepartmentsLocations/DepartmentsLocationsContainer';
import DepartmentsLocationsPagePaginationContainer from './Pagination/DepartmentsLocationsPagePaginationContainer';
import DepartmentsLocationsPageSearchContainer from './Search/DepartmentsLocationsPageSearchContainer';

let DepartmentsLocationsPage = (props) => {
    return (
        <div className="departmentsLocations-page">
            <div className="departmentsLocations-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <div className="departmentsLocations-page__controls">
                            <NavLink className="departmentsLocations-page__back-to-departmentNames btn" to="/departmentNames">Вернуться к списку отделов</NavLink>
                            <NavLink className="departmentsLocations-page__add btn" to="/departmentsLocations/add">+</NavLink>
                        </div>
                        <DepartmentsLocationsPageSearchContainer searchSwitch={props.searchSwitch} />
                        <DepartmentsLocationsContainer searchOn={props.searchOn} />
                        <DepartmentsLocationsPagePaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let DepartmentsLocationsPageClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchOn: false};
    }

    searchSwitch(search) {
        this.setState({searchOn: search ? true : false});
    }

    render() {
        return (
            <DepartmentsLocationsPage {...this.props} searchSwitch={this.searchSwitch.bind(this)} searchOn={this.state.searchOn} />
        );
    }
}

export default DepartmentsLocationsPageClassComponent;