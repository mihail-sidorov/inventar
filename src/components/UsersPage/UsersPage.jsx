import React from 'react';
import { Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import InnerPage from '../InnerPage/InnerPageContainer';

let UsersPage = (props) => {
    return (
        <div className="users-page">
            <div className="users-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPage>
                        Страница сотрудников
                    </InnerPage>
                )} />
            </div>
        </div>
    );
}

UsersPage = authHOC(UsersPage);

export default UsersPage;