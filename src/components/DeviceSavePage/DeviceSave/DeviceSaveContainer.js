import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import isEmptyObject from '../../../functions/isEmptyObject';
import { brandsGetActionCreator } from '../../../redux/brandsReducer';
import { categoriesGetActionCreator } from '../../../redux/categoriesReducer';
import { resetDeviceActionCreator, saveDevice, editDevice, setDeviceInDeviceSavePageActionCreator, specificationsSetActionCreator } from '../../../redux/deviceSavePageReducer';
import { changeWasAddInDevicesPageStateActionCreator } from '../../../redux/devicesPageReducer';
import { saveDeviceActionCreator, devicesGet, devicesGetActionCreator, attachDeviceToUserActionCreator } from '../../../redux/devicesReducer';
import { locationsGetActionCreator } from '../../../redux/locationsReducer';
import { responsiblesGetActionCreator } from '../../../redux/responsiblesReducer';
import { statusesGetActionCreator } from '../../../redux/statusesReducer';
import { suppliersGetActionCreator } from '../../../redux/suppliersReducer';
import { unAttachDeviceFromUser } from '../../../redux/userDevicesReducer';
import { usersGetActionCreator } from '../../../redux/usersReducer';
import DeviceSave from './DeviceSave';

let DeviceSaveContainer = connect(
    state => {
        return {
            responsibles: state.responsiblesState.responsibles,
            users: state.usersState.users,
            device: state.deviceSavePageState.device,
            brands: state.brandsState.brands,
            categories: state.categoriesState.categories,
            suppliers: state.suppliersState.suppliers,
            locations: state.locationsState.locations,
            statuses: state.statusesState.statuses,
            wasAdd: state.devicesPageState.wasAdd,
        };
    },
    dispatch => ({
        onSubmit: (values, props) => {
            let state = window.store.getState();

            let deviceSaveData = {...values};

            if (deviceSaveData.category_id && state.categoriesState.categories[deviceSaveData.category_id]) {
                let category = state.categoriesState.categories[deviceSaveData.category_id];
                let specificationsFields = true;

                deviceSaveData.specifications = {};

                for (let prop in category.schema.properties) {
                    if (!deviceSaveData[`specifications_${prop}`]) {
                        specificationsFields = false;
                        break;
                    }
                    else {
                        deviceSaveData.specifications[prop] = deviceSaveData[`specifications_${prop}`];
                    }
                }

                if (specificationsFields) {
                    let state = window.store.getState();
                    let statuses = state.statusesState.statuses;
                    let statusId = null;

                    for (let prop in statuses) {
                        if (statuses[prop].status === 'stock') {
                            statusId = statuses[prop].id;
                        }
                    }

                    if (deviceSaveData.status_id === undefined && statusId !== null) {
                        deviceSaveData.status_id = String(statusId);
                    }

                    if (props.match.params.device === 'add') {
                        saveDevice(deviceSaveData)
                            .then((device) => {
                                let deviceId = device.data.id;

                                if (isEmptyObject(window.store.getState().devicesState.devices)) {
                                    devicesGet()
                                        .then((response) => {
                                            dispatch(devicesGetActionCreator(response.data));
                                            dispatch(saveDeviceActionCreator(device.data));
                                            dispatch(changeWasAddInDevicesPageStateActionCreator(true));
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                }
                                else {
                                    dispatch(saveDeviceActionCreator(device.data));
                                    dispatch(changeWasAddInDevicesPageStateActionCreator(true));
                                }
                            })
                            .catch((error) => {
                                dispatch({
                                    type: 'DEVICE_SAVE_FORM_VALIDATE',
                                    errors: error.response.data.message,
                                });
                            });
                    }
                    else {
                        editDevice(deviceSaveData)
                            .then((response) => {
                                let deviceId = response.data.id;
                                dispatch(saveDeviceActionCreator(response.data));
                                alert('Оборудование отредактировано!');
                            })
                            .catch((error) => {
                                dispatch({
                                    type: 'DEVICE_SAVE_FORM_VALIDATE',
                                    errors: error.response.data.message,
                                });
                            });
                    }
                }
            }
        },
        onUsersGet: (data) => {
            dispatch(usersGetActionCreator(data));
        },
        onResponsiblesGet: (data) => {
            dispatch(responsiblesGetActionCreator(data));
        },
        onDevicesGet: (data, props) => {
            let isDevicePage = false;

            if (props.match.params.device === 'add') {
                isDevicePage = true;
            }
            else {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id == props.match.params.device) {
                        isDevicePage = true;
                        break;
                    }
                }
            }

            if (isDevicePage) {
                dispatch(devicesGetActionCreator(data));
            }
            else {
                props.history.push('/devices');
            }
        },
        onBrandsGet: (data) => {
            dispatch(brandsGetActionCreator(data));
        },
        onCategoriesGet: (data) => {
            dispatch(categoriesGetActionCreator(data));
        },
        onSuppliersGet: (data) => {
            dispatch(suppliersGetActionCreator(data));
        },
        onStatusesGet: (data) => {
            dispatch(statusesGetActionCreator(data));
        },
        onLocationsGet: (data) => {
            dispatch(locationsGetActionCreator(data));
        },
        onDeviceSet: (deviceId) => {
            dispatch(setDeviceInDeviceSavePageActionCreator(deviceId));

            let state = window.store.getState();
            let initialValues = {};

            if (state.devicesState.devices[deviceId] !== undefined) {
                initialValues = {...state.devicesState.devices[deviceId]};

                for (let prop in initialValues) {
                    if (prop !== 'specifications' && initialValues[prop] !== null && initialValues[prop] !== undefined && !(initialValues[prop] instanceof Array)) {
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

            props.initialize(initialValues);
        },
        onUnAttachUserFromDevice: (userId, deviceId) => {
            unAttachDeviceFromUser(userId, deviceId)
                .then((response) => {
                    dispatch(attachDeviceToUserActionCreator(response.data));
                    dispatch(setDeviceInDeviceSavePageActionCreator(deviceId));
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    })
)(DeviceSave);

export default DeviceSaveContainer;