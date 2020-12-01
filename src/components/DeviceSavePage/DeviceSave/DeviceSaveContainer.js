import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { brandsGetActionCreator } from '../../../redux/brandsReducer';
import { categoriesGetActionCreator } from '../../../redux/categoriesReducer';
import { resetDeviceActionCreator, setDeviceInDeviceSavePageActionCreator, specificationsSetActionCreator } from '../../../redux/deviceSavePageReducer';
import { devicesGetActionCreator } from '../../../redux/devicesReducer';
import { responsiblesGetActionCreator } from '../../../redux/responsiblesReducer';
import { usersGetActionCreator } from '../../../redux/usersReducer';
import DeviceSave from './DeviceSave';

let DeviceSaveContainer = connect(
    state => ({
        responsibles: state.responsiblesState.responsibles,
        users: state.usersState.users,
        device: state.deviceSavePageState.device,
        brands: state.brandsState.brands,
        categories: state.categoriesState.categories,
    }),
    dispatch => ({
        onSubmit: (values) => {
            console.log(values);
        },
        onUsersGet: (data) => {
            dispatch(usersGetActionCreator(data));
        },
        onResponsiblesGet: (data) => {
            dispatch(responsiblesGetActionCreator(data));
        },
        onDevicesGet: (data) => {
            dispatch(devicesGetActionCreator(data));
        },
        onBrandsGet: (data) => {
            dispatch(brandsGetActionCreator(data));
        },
        onCategoriesGet: (data) => {
            dispatch(categoriesGetActionCreator(data));
        },
        onDeviceSet: (deviceId) => {
            dispatch(setDeviceInDeviceSavePageActionCreator(deviceId));

            let state = window.store.getState();
            let initialValues = {};

            if (state.devicesState.devices[deviceId] !== undefined) {
                initialValues = {...state.devicesState.devices[deviceId]};

                for (let prop in initialValues) {
                    if (prop !== 'specifications' && initialValues[prop] !== null && initialValues[prop] !== undefined) {
                        initialValues[prop] = String(initialValues[prop]);
                    }
                    if (prop === 'date_purchase' || prop === 'date_warranty_end') {
                        let date = new Date(initialValues[prop]);

                        let month = Number(date.getUTCMonth()) + 1;
                        if (month < 10) {
                            month = '0' + String(month);
                        }
                        else {
                            month = String(month);
                        }

                        let day = Number(date.getUTCDate());
                        if (day < 10) {
                            day = '0' + String(day);
                        }
                        else {
                            day = String(day);
                        }

                        initialValues[prop] = date.getUTCFullYear() + '-' + month + '-' + day;
                    }
                    if (prop === 'specifications') {
                        for (let specificationsProp in initialValues[prop]) {
                            if (initialValues[prop][specificationsProp] !== null && initialValues[prop][specificationsProp] !== undefined) {
                                initialValues[prop][specificationsProp] = String(initialValues[prop][specificationsProp]);
                            }
                        }
                    }
                }
            }

            dispatch(initialize('deviceSaveForm', initialValues));
        },
        onResetDevice: (emptyObject) => {
            dispatch(resetDeviceActionCreator(emptyObject));
            dispatch(initialize('deviceSaveForm', emptyObject));
        },
        onSpecificationsSet: (categoryId) => {
            dispatch(specificationsSetActionCreator(categoryId));
        },
        onSpecificationsReset: (props) => {
            let state = window.store.getState();
            let device = state.deviceSavePageState.device;
            let values = state.form.deviceSaveForm.values;

            for (let prop in device) {
                let pattern = new RegExp(/^specifications_/);

                if (prop.match(pattern)) {
                    delete device[prop];
                }
            }

            for (let prop in values) {
                let pattern = new RegExp(/^specifications_/);

                if (prop.match(pattern)) {
                    delete values[prop];
                }
            }

            let initialValues = {...values};

            for (let prop in initialValues) {
                if (prop !== 'specifications' && initialValues[prop] !== null && initialValues[prop] !== undefined) {
                    initialValues[prop] = String(initialValues[prop]);
                }
                else {
                    for (let specificationsProp in initialValues[prop]) {
                        if (initialValues[prop][specificationsProp] !== null && initialValues[prop][specificationsProp] !== undefined) {
                            initialValues[prop][specificationsProp] = String(initialValues[prop][specificationsProp]);
                        }
                    }
                }
            }

            props.initialize(initialValues);
        },
    })
)(DeviceSave);

export default DeviceSaveContainer;