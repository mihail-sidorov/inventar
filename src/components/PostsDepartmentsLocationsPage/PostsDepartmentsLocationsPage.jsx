import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import InnerPage from '../InnerPage/InnerPageContainer';
import PostsDepartmentsLocationsPagePaginationContainer from './Pagination/PostsDepartmentsLocationsPagePaginationContainer';
import PostsDepartmentsLocationsContainer from './PostsDepartmentsLocations/PostsDepartmentsLocationsContainer';
import PostsDepartmentsLocationsPageSearchContainer from './Search/PostsDepartmentsLocationsPageSearchContainer';

let PostsDepartmentsLocationsPage = (props) => {
    return (
        <div className="postsDepartmentsLocations-page">
            <div className="postsDepartmentsLocations-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPage>
                        <div className="postsDepartmentsLocations-page__controls">
                            <NavLink className="postsDepartmentsLocations-page__back-to-posts btn" to="/posts">Вернуться к списку должностей</NavLink>
                            <NavLink className="postsDepartmentsLocations-page__add btn" to="/postsDepartmentsLocations/add">+</NavLink>
                        </div>
                        <PostsDepartmentsLocationsPageSearchContainer />
                        <PostsDepartmentsLocationsContainer />
                        <PostsDepartmentsLocationsPagePaginationContainer />
                    </InnerPage>
                )} />
            </div>
        </div>
    );
}

export default authHOC(PostsDepartmentsLocationsPage);