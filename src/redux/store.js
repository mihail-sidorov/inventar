import {createStore, combineReducers} from 'redux';
import mainPageReducer from './mainPageReducer';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import devicesPageReducer from './devicesPageReducer';

let reducers = combineReducers({
    mainPageState: mainPageReducer,
    authState: authReducer,
    devicesPageState: devicesPageReducer,
    form: formReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;