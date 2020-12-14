import React from 'react';
import { Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import InnerPage from '../InnerPage/InnerPageContainer';
import UsersPaginationContainer from './Pagination/UsersPaginationContainer';
import UsersSearchContainer from './Search/UsersSearchContainer';
import UsersContainer from './Users/UsersContainer';

let UsersPage = (props) => {
    return (
        <div className="users-page">
            <div className="users-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPage>
                        <UsersSearchContainer />
                        <UsersContainer />
                        <UsersPaginationContainer />
                    </InnerPage>
                )} />
            </div>
        </div>
    );
}

UsersPage = authHOC(UsersPage);

export default UsersPage;