import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import InnerPage from '../InnerPage/InnerPageContainer';
import DepartmentsLocationsContainer from './DepartmentsLocations/DepartmentsLocationsContainer';
import DepartmentsLocationsPagePaginationContainer from './Pagination/DepartmentsLocationsPagePaginationContainer';
import DepartmentsLocationsPageSearchContainer from './Search/DepartmentsLocationsPageSearchContainer';

let DepartmentsLocationsPage = (props) => {
    return (
        <div className="departmentsLocations-page">
            <div className="departmentsLocations-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPage>
                        <div className="departmentsLocations-page__controls">
                            <NavLink className="departmentsLocations-page__back-to-departmentNames btn" to="/departmentNames">Вернуться к списку отделов</NavLink>
                            <NavLink className="departmentsLocations-page__add btn" to="/departmentsLocations/add">+</NavLink>
                        </div>
                        <DepartmentsLocationsPageSearchContainer />
                        <DepartmentsLocationsContainer />
                        <DepartmentsLocationsPagePaginationContainer />
                    </InnerPage>
                )} />
            </div>
        </div>
    );
}

export default authHOC(DepartmentsLocationsPage);