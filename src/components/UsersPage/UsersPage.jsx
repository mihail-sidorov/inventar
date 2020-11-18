import React from 'react';
import authHOC from '../../HOC/authHOC';
import InnerPage from '../InnerPage/InnerPage';

let UsersPage = (props) => {
    return (
        <div className="users-page">
            <div className="users-page__wrapper section-2">
                <InnerPage>
                    Страница сотрудников
                </InnerPage>
            </div>
        </div>
    );
}

UsersPage = authHOC(UsersPage);

export default UsersPage;