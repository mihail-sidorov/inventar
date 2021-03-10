import React from 'react';
import { Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import InnerPage from '../InnerPage/InnerPageContainer';

let ActsPage = (props) => {
    return (
        <div className="acts-page">
            <div className="acts-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPage>
                        Страница актов
                    </InnerPage>
                )} />
            </div>
        </div>
    );
}

export default authHOC(ActsPage);