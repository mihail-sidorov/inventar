import React from 'react';
import { Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import InnerPage from '../InnerPage/InnerPageContainer';
import DeviceSaveContainer from './DeviceSave/DeviceSaveContainer';

let DeviceSavePage = (props) => {
    return (
        <div className="device-save-page">
            <div className="device-save-page__wrapper section-2">
                <Route path="/:page/:device" render={() => (
                    <InnerPage>
                        <DeviceSaveContainer />
                    </InnerPage>
                )} />
            </div>
        </div>
    );
}

export default authHOC(DeviceSavePage);