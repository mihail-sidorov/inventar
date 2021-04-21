import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Page404 from './common/Page404/Page404';
import SwitchRolesContainer from './common/SwitchRoles/SwitchRolesContainer';
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
import EventPageCardContainer from './EventPageCard/EventPageCardContainer';
import EventsPage from './EventsPage/EventsPage';
import HeaderContainer from './Header/HeaderContainer';
import LocationPageAddContainer from './LocationPageAdd/LocationPageAddContainer';
import LocationPageEditContainer from './LocationPageEdit/LocationPageEditContainer';
import LocationsPage from './LocationsPage/LocationsPage';
import LoginPageContainer from './LoginPage/LoginPageContainer';
import MainPageContainer from './MainPage/MainPageContainer';
import PostDepartmentLocationPageAddContainer from './PostDepartmentLocationPageAdd/PostDepartmentLocationPageAddContainer';
import PostDepartmentLocationPageEditContainer from './PostDepartmentLocationPageEdit/PostDepartmentLocationPageEditContainer';
import PostPageAddContainer from './PostPageAdd/PostPageAddContainer';
import PostPageEditContainer from './PostPageEdit/PostPageEditContainer';
import PostsDepartmentsLocationsPage from './PostsDepartmentsLocationsPage/PostsDepartmentsLocationsPage';
import PostsPage from './PostsPage/PostsPage';
import DevicesPageUserContainer from './Roles/User/DevicesPageUser/DevicesPageUserContainer';
import ServicesPageUserContainer from './Roles/User/ServicesPageUser/ServicesPageUserContainer';
import ServicePageAddContainer from './ServicePageAdd/ServicePageAddContainer';
import ServicePageCardContainer from './ServicePageCard/ServicePageCardContainer';
import ServicePageEditContainer from './ServicePageEdit/ServicePageEditContainer';
import ServicesPage from './ServicesPage/ServicesPage';
import SoftwarePageAddContainer from './SoftwarePageAdd/SoftwarePageAddContainer';
import SoftwarePageCardContainer from './SoftwarePageCard/SoftwarePageCardContainer';
import SoftwarePageEditContainer from './SoftwarePageEdit/SoftwarePageEditContainer';
import SoftwaresPage from './SoftwaresPage/SoftwaresPage';
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
                <Route path="/main" render={() => <MainPageContainer />} />
                <Route exact path="/devices" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <DevicesPage />},
                                {role: 'user', component: <DevicesPageUserContainer />},
                            ]} />} />
                <Route exact path="/users" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <UsersPage />},
                            ]} />} />
                <Route exact path="/services" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <ServicesPage />},
                                {role: 'user', component: <ServicesPageUserContainer />},
                            ]} />} />
                <Route exact path="/devices/:device" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <DeviceSavePage />},
                            ]} /> } />
                <Route exact path="/users/add" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <UserPageAddContainer />},
                            ]} /> } />
                <Route exact path="/users/:userId" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <UserPageEditContainer />},
                            ]} /> } />
                <Route exact path="/services/add" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <ServicePageAddContainer />},
                            ]} /> } />
                <Route exact path="/services/:serviceId" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <ServicePageEditContainer />},
                            ]} /> } />
                <Route exact path="/devices/card/:deviceId" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <DevicePageCardContainer />},
                            ]} /> } />
                <Route exact path="/users/card/:userId" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <UserPageCardContainer />},
                            ]} /> } />
                <Route exact path="/events" render={() => <EventsPage />} />
                <Route exact path="/events/card/:eventId" render={() => <EventPageCardContainer />} />
                <Route exact path="/services/card/:serviceId" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <ServicePageCardContainer />},
                            ]} /> } />
                <Route exact path="/employers/add" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <EmployerPageAddContainer />},
                            ]} /> } />
                <Route exact path="/employers/:employerId" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <EmployerPageEditContainer />},
                            ]} /> } />
                <Route exact path="/employers" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <EmployersPage />},
                            ]} /> } />
                <Route exact path="/locations" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <LocationsPage />},
                            ]} /> } />
                <Route exact path="/locations/add" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <LocationPageAddContainer />},
                            ]} /> } />
                <Route exact path="/locations/:locationId" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <LocationPageEditContainer />},
                            ]} /> } />
                <Route exact path="/posts" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <PostsPage />},
                            ]} /> } />
                <Route exact path="/posts/add" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <PostPageAddContainer />},
                            ]} /> } />
                <Route exact path="/posts/:postId" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <PostPageEditContainer />},
                            ]} /> } />
                <Route exact path="/departmentNames" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <DepartmentNamesPage />},
                            ]} /> } />
                <Route exact path="/departmentNames/add" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <DepartmentNamePageAddContainer />},
                            ]} /> } />
                <Route exact path="/departmentNames/:departmentNameId" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <DepartmentNamePageEditContainer />},
                            ]} /> } />
                <Route exact path="/departmentsLocations/add" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <DepartmentLocationPageAddContainer />},
                            ]} /> } />
                <Route exact path="/departmentsLocations/:departmentLocationId" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <DepartmentLocationPageEditContainer />},
                            ]} /> } />
                <Route exact path="/departmentsLocations" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <DepartmentsLocationsPage />},
                            ]} /> } />
                <Route exact path="/postsDepartmentsLocations/add" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <PostDepartmentLocationPageAddContainer />},
                            ]} /> } />
                <Route exact path="/postsDepartmentsLocations/:postDepartmentLocationId" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <PostDepartmentLocationPageEditContainer />},
                            ]} /> } />
                <Route exact path="/postsDepartmentsLocations" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <PostsDepartmentsLocationsPage />},
                            ]} /> } />
                <Route exact path="/softwares/add" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <SoftwarePageAddContainer />},
                            ]} /> } />
                <Route exact path="/softwares/:softwareId" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <SoftwarePageEditContainer />},
                            ]} /> } />
                <Route exact path="/softwares" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <SoftwaresPage />},
                            ]} /> } />
                <Route exact path="/softwares/card/:softwareId" render={() => <SwitchRolesContainer roles={[
                                {role: 'admin', component: <SoftwarePageCardContainer />},
                            ]} /> } />
                <Page404 />
            </Switch>
        </div>
    );
}

export default App;