import React from 'react';
import { Route } from 'react-router-dom';
import InnerPage from '../InnerPage/InnerPage';

let DeviceSavePage = (props) => {
    return (
        <div className="device-save-page">
            <div className="device-save-page__wrapper section-2">
                <Route path="/:page" render={() => (
                    <InnerPage>
                        Страница сохранения оборудования
                    </InnerPage>
                )} />
            </div>
        </div>
    );
}

export default DeviceSavePage;