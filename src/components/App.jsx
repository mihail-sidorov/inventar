import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DevicesPage from './DevicesPage/DevicesPage';
import HeaderContainer from './Header/HeaderContainer';
import LoginPageContainer from './LoginPage/LoginPageContainer';
import MainPage from './MainPage/MainPage';
import ServicesPage from './ServicesPage/ServicesPage';
import UsersPage from './UsersPage/UsersPage';

let App = () => {
    return (
        <div className="inventar-app">
            <HeaderContainer />
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route path="/login" render={() => <LoginPageContainer />} />
                <Route path="/main" render={() => <MainPage />} />
                <Route path="/devices" render={() => <DevicesPage />} />
                <Route path="/users" render={() => <UsersPage />} />
                <Route path="/services" render={() => <ServicesPage />} />
            </Switch>
        </div>
    );
}

export default App;