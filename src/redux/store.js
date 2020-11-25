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

let reducers = combineReducers({
    mainPageState: mainPageReducer,
    authState: authReducer,
    devicesState: devicesReducer,
    devicesPageState: devicesPageReducer,
    usersState: usersReducer,
    brandsState: brandsReducer,
    responsiblesState: responsiblesReducer,
    deviceSavePageState: deviceSavePageReducer,
    form: formReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;