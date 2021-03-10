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
import accountTypesReducer from './accountTypesReducer';
import accountsReducer from './accountsReducer';
import servicesPageReducer from './servicesPageReducer';
import servicePageEditReducer from './servicePageEditReducer';
import departmentsReducer from './departmentsReducer';
import eventsPageReducer from './eventsPageReducer';
import eventsReducer from './eventsReducer';
import subDevicesReducer from './subDevicesReducer';
import employersPageReducer from './employersPageReducer';

const ValidateReducer = actionType => {
    return (state, action) => {
        let newState;

        if (action.type === actionType) {
            newState = {...state};
            newState.fields = {...newState.fields};
            newState.syncErrors = {...newState.syncErrors};
            action.errors.forEach(element => {
                let fieldNameArray = element.dataPath.split('.');
                let fieldName = fieldNameArray[fieldNameArray.length - 1];
                if (fieldNameArray[fieldNameArray.length - 2] === 'specifications') {
                    fieldName = 'specifications_' + fieldName;
                }
                let error = element.message;
                newState.fields[fieldName] = {touched: true};
                newState.syncErrors[fieldName] = error;
            });

            return newState;
        }

        return state;
    }
}

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
    accountTypesState: accountTypesReducer,
    accountsState: accountsReducer,
    servicesPageState: servicesPageReducer,
    servicePageEditState: servicePageEditReducer,
    departmentsState: departmentsReducer,
    form: formReducer.plugin({
        deviceSaveForm: ValidateReducer('DEVICE_SAVE_FORM_VALIDATE'),
        userAddForm: ValidateReducer('USER_ADD_FORM_VALIDATE'),
        userEditForm: ValidateReducer('USER_EDIT_FORM_VALIDATE'),
    }),
    eventsState: eventsReducer,
    eventsPageState: eventsPageReducer,
    subDevicesState: subDevicesReducer,
    employersPageState: employersPageReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;