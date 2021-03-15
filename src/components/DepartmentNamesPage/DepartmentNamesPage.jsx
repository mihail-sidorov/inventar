import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import InnerPage from '../InnerPage/InnerPageContainer';
import DepartmentNamesContainer from './DepartmentNames/DepartmentNamesContainer';
import DepartmentNamesPagePaginationContainer from './Pagination/DepartmentNamesPagePaginationContainer';
import DepartmentNamesPageSearchContainer from './Search/DepartmentNamesPageSearchContainer';

let DepartmentNamesPage = (props) => {
    return (
        <div className="department-names-page">
            <div className="department-names-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPage>
                        <div className="department-names-page__controls">
                            <NavLink className="department-names-page__go-to-departmentsLocations btn" to="/departmentsLocations">Перейти к списку отделов-местонахождений</NavLink>
                        </div>
                        <DepartmentNamesPageSearchContainer />
                        <DepartmentNamesContainer />
                        <DepartmentNamesPagePaginationContainer />
                    </InnerPage>
                )} />
            </div>
        </div>
    );
}

export default authHOC(DepartmentNamesPage);