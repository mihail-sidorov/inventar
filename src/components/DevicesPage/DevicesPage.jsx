import React from 'react';
import { Route } from 'react-router-dom';
import authHOC from '../../HOC/authHOC';
import InnerPage from '../InnerPage/InnerPage';
import DevicesContainer from './Devices/DevicesContainer';
import DevicesPaginationContainer from './Pagination/DevicesPaginationContainer';
import DevicesSearchContainer from './Search/DevicesSearchContainer';

let DevicesPage = (props) => {
    return (
        <div className="devices-page">
            <div className="devices-page__wrapper section-2">
                <Route exact path="/:page" render={() => (
                    <InnerPage>
                        <DevicesSearchContainer />
                        <DevicesContainer />
                        <DevicesPaginationContainer />
                    </InnerPage>
                )} />
            </div>
        </div>
    );
}

DevicesPage = authHOC(DevicesPage);

export default DevicesPage;