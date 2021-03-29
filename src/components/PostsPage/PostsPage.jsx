import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import InnerPageContainer from '../InnerPage/InnerPageContainer';
import PostsPagePaginationContainer from './Pagination/PostsPagePaginationContainer';
import PostsContainer from './Posts/PostsContainer';
import PostsPageSearchContainer from './Search/PostsPageSearchContainer';

let PostsPage = (props) => {
    return (
        <div className="posts-page">
            <div className="posts-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <div className="posts-page__controls">
                            <NavLink className="posts-page__go-to-postsDepartmentsLocations btn" to="/postsDepartmentsLocations">Перейти к списку должностей-отделов-местонахождений</NavLink>
                        </div>
                        <PostsPageSearchContainer />
                        <PostsContainer />
                        <PostsPagePaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

export default authHOC(PostsPage);