import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPageContainer from './LoginPage/LoginPageContainer';
import MainPage from './MainPage/MainPage';

let App = () => {
    return (
        <div className="inventar-app">
            <Switch>
                <Redirect exact from="/" to="/login" />
                <Route path="/login" render={() => <LoginPageContainer />} />
                <Route path="/main" render={() => <MainPage />} />
            </Switch>
        </div>
    );
}

export default App;