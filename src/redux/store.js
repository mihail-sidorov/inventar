import {createStore, combineReducers} from 'redux';
import mainPageReducer from './mainPageReducer';

let reducers = combineReducers({
    mainPageState: mainPageReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;