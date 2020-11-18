import React from 'react';
import authHOC from '../../HOC/authHOC';
import InnerPage from '../InnerPage/InnerPage';

let ActsPage = (props) => {
    return (
        <div className="acts-page">
            <div className="acts-page__wrapper section-2">
                <InnerPage>
                    Страница актов
                </InnerPage>
            </div>
        </div>
    );
}

ActsPage = authHOC(ActsPage);

export default ActsPage;