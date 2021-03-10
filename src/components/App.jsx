import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ActsPage from './ActsPage/ActsPage';
import DevicePageCardContainer from './DevicePageCard/DevicePageCardContainer';
import DeviceSavePage from './DeviceSavePage/DeviceSavePage';
import DevicesPage from './DevicesPage/DevicesPage';
import EmployerPageAddContainer from './EmployerPageAdd/EmployerPageAddContainer';
import EmployerPageEditContainer from './EmployerPageEdit/EmployerPageEditContainer';
import EmployersPage from './EmployersPage/EmployersPage';
import EventsPage from './EventsPage/EventsPage';
import HeaderContainer from './Header/HeaderContainer';
import LoginPageContainer from './LoginPage/LoginPageContainer';
import MainPage from './MainPage/MainPage';
import ServicePageAddContainer from './ServicePageAdd/ServicePageAddContainer';
import ServicePageCardContainer from './ServicePageCard/ServicePageCardContainer';
import ServicePageEditContainer from './ServicePageEdit/ServicePageEditContainer';
import ServicesPage from './ServicesPage/ServicesPage';
import UserPageAddContainer from './UserPageAdd/UserPageAddContainer';
import UserPageCardContainer from './UserPageCard/UserPageCardContainer';
import UserPageEditContainer from './UserPageEdit/UserPageEditContainer';
import UsersPage from './UsersPage/UsersPage';

let App = () => {
    return (
        <div className="inventar-app">
            <HeaderContainer />
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route path="/login" render={() => <LoginPageContainer />} />
                <Route path="/main" render={() => <MainPage />} />
                <Route exact path="/devices" render={() => <DevicesPage />} />
                <Route exact path="/users" render={() => <UsersPage />} />
                <Route exact path="/services" render={() => <ServicesPage />} />
                <Route path="/acts" render={() => <ActsPage />} />
                <Route exact path="/devices/:device" render={() => <DeviceSavePage />} />
                <Route exact path="/users/add" render={() => <UserPageAddContainer />} />
                <Route exact path="/users/:userId" render={() => <UserPageEditContainer />} />
                <Route exact path="/services/add" render={() => <ServicePageAddContainer />} />
                <Route exact path="/services/:serviceId" render={() => <ServicePageEditContainer />} />
                <Route exact path="/devices/card/:deviceId" render={() => <DevicePageCardContainer />} />
                <Route exact path="/users/card/:userId" render={() => <UserPageCardContainer />} />
                <Route exact path="/events" render={() => <EventsPage />} />
                <Route exact path="/services/card/:serviceId" render={() => <ServicePageCardContainer />} />
                <Route exact path="/employers/add" render={() => <EmployerPageAddContainer />} />
                <Route exact path="/employers/:employerId" render={() => <EmployerPageEditContainer />} />
                <Route exact path="/employers" render={() => <EmployersPage />} />
            </Switch>
        </div>
    );
}

export default App;