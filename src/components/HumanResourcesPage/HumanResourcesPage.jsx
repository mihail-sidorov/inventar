import React from 'react';
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import InnerPageContainer from '../InnerPage/InnerPageContainer';

let HumanResourcesPage = () => {
    return (
        <div className="human-resources-page">
            <div className="human-resources-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPageContainer>
                        <div className="human-resources-page__menu">
                            <div className="human-resources-page__menu-items">
                                <NavLink className="human-resources-page__menu-item" to="/mentorer">Наставничество</NavLink>
                            </div>
                        </div>
                    </InnerPageContainer>
                )} />
            </div>
        </div>
    );
};

export default HumanResourcesPage;