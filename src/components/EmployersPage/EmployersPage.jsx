import React from 'react';
import { Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
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
                        <EmployersPageSearchContainer />
                        <EmployersContainer />
                        <EmployersPagePaginationContainer />
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
}

export default authHOC(EmployersPage);