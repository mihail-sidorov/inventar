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
import locationsPageReducer from './locationsPageReducer';
import postsReducer from './postsReducer';
import postsPageReducer from './postsPageReducer';
import departmentNamesReducer from './departmentNamesReducer';
import departmentNamesPageReducer from './departmentNamesPageReducer';
import departmentsLocationsReducer from './departmentsLocationsReducer';
import departmentsLocationsPageReducer from './departmentsLocationsPageReducer';
import postsDepartmentsLocationsReducer from './postsDepartmentsLocationsReducer';
import postsDepartmentsLocationsPageReducer from './postsDepartmentsLocationsPageReducer';
import userPageEditReducer from './userPageEditReducer';
import devicesPageUserReducer from './devicesPageUserReducer';
import servicesPageUserReducer from './servicesPageUserReducer';
import postDepartmentLocationPageAddReducer from './postDepartmentLocationPageAddReducer';
import postDepartmentLocationPageEditReducer from './postDepartmentLocationPageEditReducer';
import softwareCategoriesReducer from './softwareCategoriesReducer';
import softwaresReducer from './softwaresReducer';
import softwaresPageReducer from './softwaresPageReducer';
import subSoftwaresReducer from './subSoftwaresReducer';
import mentorerPageReducer from './mentorerPageReducer';
import mentoringConnectionsReducer from './mentoringConnectionsReducer';

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

const appReducer = combineReducers({
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
        softwareAddForm: ValidateReducer('SOFTWARE_ADD_FORM_VALIDATE'),
        softwareEditForm: ValidateReducer('SOFTWARE_EDIT_FORM_VALIDATE'),
    }),
    eventsState: eventsReducer,
    eventsPageState: eventsPageReducer,
    subDevicesState: subDevicesReducer,
    employersPageState: employersPageReducer,
    locationsPageState: locationsPageReducer,
    postsState: postsReducer,
    postsPageState: postsPageReducer,
    departmentNamesState: departmentNamesReducer,
    departmentNamesPageState: departmentNamesPageReducer,
    departmentsLocationsState: departmentsLocationsReducer,
    departmentsLocationsPageState: departmentsLocationsPageReducer,
    postsDepartmentsLocationsState: postsDepartmentsLocationsReducer,
    postsDepartmentsLocationsPageState: postsDepartmentsLocationsPageReducer,
    userPageEditState: userPageEditReducer,
    devicesPageUserState: devicesPageUserReducer,
    servicesPageUserState: servicesPageUserReducer,
    postDepartmentLocationPageAddState: postDepartmentLocationPageAddReducer,
    postDepartmentLocationPageEditState: postDepartmentLocationPageEditReducer,
    softwareCategoriesState: softwareCategoriesReducer,
    softwaresState: softwaresReducer,
    softwaresPageState: softwaresPageReducer,
    subSoftwaresState: subSoftwaresReducer,
    mentorerPageState: mentorerPageReducer,
    mentoringConnectionsState: mentoringConnectionsReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'SET_AUTH_DATA') {
      state = undefined
    }
  
    return appReducer(state, action)
}

let store = createStore(rootReducer);

window.store = store;

export default store;