import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import DepartmentNamesContainer from './DepartmentNames/DepartmentNamesContainer';
import DepartmentNamesPagePaginationContainer from './Pagination/DepartmentNamesPagePaginationContainer';
import DepartmentNamesPageSearchContainer from './Search/DepartmentNamesPageSearchContainer';

let DepartmentNamesPage = (props) => {
    return (
        <div className="department-names-page">
            <div className="department-names-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <div className="department-names-page__controls">
                            <NavLink className="department-names-page__go-to-departmentsLocations btn" to="/departmentsLocations">Перейти к списку отделов-местонахождений</NavLink>
                        </div>
                        <DepartmentNamesPageSearchContainer searchSwitch={props.searchSwitch} />
                        <DepartmentNamesContainer searchOn={props.searchOn} />
                        <DepartmentNamesPagePaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

let DepartmentNamesPageClassComponent = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchOn: false};
    }

    searchSwitch(search) {
        this.setState({searchOn: search ? true : false});
    }

    render() {
        return (
            <DepartmentNamesPage {...this.props} searchSwitch={this.searchSwitch.bind(this)} searchOn={this.state.searchOn} />
        );
    }
}

export default DepartmentNamesPageClassComponent;