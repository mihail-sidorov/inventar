import {createStore, combineReducers} from 'redux';
import mainPageReducer from './mainPageReducer';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';

let reducers = combineReducers({
    mainPageState: mainPageReducer,
    authState: authReducer,
    form: formReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;