import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ActsPage from './ActsPage/ActsPage';
import DepartmentLocationPageAddContainer from './DepartmentLocationPageAdd/DepartmentLocationPageAddContainer';
import DepartmentLocationPageEditContainer from './DepartmentLocationPageEdit/DepartmentLocationPageEditContainer';
import DepartmentNamePageAddContainer from './DepartmentNamePageAdd/DepartmentNamePageAddContainer';
import DepartmentNamePageEditContainer from './DepartmentNamePageEdit/DepartmentNamePageEditContainer';
import DepartmentNamesPage from './DepartmentNamesPage/DepartmentNamesPage';
import DepartmentsLocationsPage from './DepartmentsLocationsPage/DepartmentsLocationsPage';
import DevicePageCardContainer from './DevicePageCard/DevicePageCardContainer';
import DeviceSavePage from './DeviceSavePage/DeviceSavePage';
import DevicesPage from './DevicesPage/DevicesPage';
import EmployerPageAddContainer from './EmployerPageAdd/EmployerPageAddContainer';
import EmployerPageEditContainer from './EmployerPageEdit/EmployerPageEditContainer';
import EmployersPage from './EmployersPage/EmployersPage';
import EventsPage from './EventsPage/EventsPage';
import HeaderContainer from './Header/HeaderContainer';
import LocationPageAddContainer from './LocationPageAdd/LocationPageAddContainer';
import LocationPageEditContainer from './LocationPageEdit/LocationPageEditContainer';
import LocationsPage from './LocationsPage/LocationsPage';
import LoginPageContainer from './LoginPage/LoginPageContainer';
import MainPage from './MainPage/MainPage';
import PostDepartmentLocationPageAddContainer from './PostDepartmentLocationPageAdd/PostDepartmentLocationPageAddContainer';
import PostDepartmentLocationPageEditContainer from './PostDepartmentLocationPageEdit/PostDepartmentLocationPageEditContainer';
import PostPageAddContainer from './PostPageAdd/PostPageAddContainer';
import PostPageEditContainer from './PostPageEdit/PostPageEditContainer';
import PostsPage from './PostsPage/PostsPage';
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
                <Route exact path="/locations" render={() => <LocationsPage />} />
                <Route exact path="/locations/add" render={() => <LocationPageAddContainer />} />
                <Route exact path="/locations/:locationId" render={() => <LocationPageEditContainer />} />
                <Route exact path="/posts" render={() => <PostsPage />} />
                <Route exact path="/posts/add" render={() => <PostPageAddContainer />} />
                <Route exact path="/posts/:postId" render={() => <PostPageEditContainer />} />
                <Route exact path="/departmentNames" render={() => <DepartmentNamesPage />} />
                <Route exact path="/departmentNames/add" render={() => <DepartmentNamePageAddContainer />} />
                <Route exact path="/departmentNames/:departmentNameId" render={() => <DepartmentNamePageEditContainer />} />
                <Route exact path="/departmentsLocations/add" render={() => <DepartmentLocationPageAddContainer />} />
                <Route exact path="/departmentsLocations/:departmentLocationId" render={() => <DepartmentLocationPageEditContainer />} />
                <Route exact path="/departmentsLocations" render={() => <DepartmentsLocationsPage />} />
                <Route exact path="/postsDepartmentsLocations/add" render={() => <PostDepartmentLocationPageAddContainer />} />
                <Route exact path="/postsDepartmentsLocations/:postDepartmentLocationId" render={() => <PostDepartmentLocationPageEditContainer />} />
            </Switch>
        </div>
    );
}

export default App;