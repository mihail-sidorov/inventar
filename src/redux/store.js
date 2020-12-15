import {createStore, combineReducers} from 'redux';
import mainPageReducer from './mainPageReducer';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import devicesReducer from './devicesReducer';
import devicesPageReducer from './devicesPageReducer';
import usersReducer from './usersReducer';
import brandsReducer from './brandsReducer';
import responsiblesReducer from './responsiblesReducer';
import deviceSavePageReducer from './deviceSavePageReducer';
import categoriesReducer from './categoriesReducer';
import suppliersReducer from './suppliersReducer';
import statusesReducer from './statusesReducer';
import locationsReducer from './locationsReducer';
import userPageAddReducer from './userPageAddReducer';
import employersReducer from './employersReducer';
import postDepLocsReducer from './postDepLocsReducer';
import usersPageReducer from './usersPageReducer';
import userDevicesReducer from './userDevicesReducer';

let reducers = combineReducers({
    mainPageState: mainPageReducer,
    authState: authReducer,
    devicesState: devicesReducer,
    devicesPageState: devicesPageReducer,
    usersState: usersReducer,
    brandsState: brandsReducer,
    responsiblesState: responsiblesReducer,
    categoriesState: categoriesReducer,
    suppliersState: suppliersReducer,
    statusesState: statusesReducer,
    deviceSavePageState: deviceSavePageReducer,
    locationsState: locationsReducer,
    userPageAddState: userPageAddReducer,
    employersState: employersReducer,
    postDepLocsState: postDepLocsReducer,
    usersPageState: usersPageReducer,
    userDevicesState: userDevicesReducer,
    form: formReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;