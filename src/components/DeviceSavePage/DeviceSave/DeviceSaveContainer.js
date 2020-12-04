import { connect } from 'react-redux';
import { change, initialize } from 'redux-form';
import isEmptyObject from '../../../functions/isEmptyObject';
import { brandsGetActionCreator } from '../../../redux/brandsReducer';
import { categoriesGetActionCreator } from '../../../redux/categoriesReducer';
import { resetDeviceActionCreator, saveDevice, editDevice, setDeviceInDeviceSavePageActionCreator, specificationsSetActionCreator, subDevicesSetActionCreator, resetSubDevicesActionCreator, subDevices } from '../../../redux/deviceSavePageReducer';
import { changeWasAddInDevicesPageStateActionCreator } from '../../../redux/devicesPageReducer';
import { saveDeviceActionCreator, devicesGet, devicesGetActionCreator, subDevicesAttachActionCreator } from '../../../redux/devicesReducer';
import { locationsGetActionCreator } from '../../../redux/locationsReducer';
import { responsiblesGetActionCreator } from '../../../redux/responsiblesReducer';
import { statusesGetActionCreator } from '../../../redux/statusesReducer';
import { suppliersGetActionCreator } from '../../../redux/suppliersReducer';
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

                if (specificationsFields && deviceSaveData.model && deviceSaveData.inv_number && deviceSaveData.price && deviceSaveData.date_purchase && deviceSaveData.date_warranty_end && deviceSaveData.user_id && deviceSaveData.brand_id && deviceSaveData.supplier_id && deviceSaveData.location_id) {
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

                    let ids = [];
                    for (let prop in deviceSaveData) {
                        let pattern = new RegExp(/^sub-device-/);
                        if (prop.match(pattern)) {
                            if (deviceSaveData[prop] === true) {
                                ids.push(prop.split('-')[2]);
                            }
                            delete deviceSaveData[prop];
                        }
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
                                            subDevices({id: deviceId, ids: ids})
                                                .then((response) => {
                                                    dispatch(subDevicesAttachActionCreator(deviceId, response.data));
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                }
                                else {
                                    dispatch(saveDeviceActionCreator(device.data));
                                    dispatch(changeWasAddInDevicesPageStateActionCreator(true));
                                    subDevices({id: deviceId, ids: ids})
                                        .then((response) => {
                                            dispatch(subDevicesAttachActionCreator(deviceId, response.data));
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                }
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                    else {
                        editDevice(deviceSaveData)
                            .then((response) => {
                                let deviceId = response.data.id;
                                dispatch(saveDeviceActionCreator(response.data));
                                subDevices({id: deviceId, ids: ids})
                                    .then((response) => {
                                        dispatch(subDevicesAttachActionCreator(deviceId, response.data));
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                                alert('Оборудование отредактировано!');
                            })
                            .catch((error) => {
                                console.log(error);
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

            for (let i = 0; i < data.length; i++) {
                if (data[i].id == props.match.params.device) {
                    isDevicePage = true;
                    break;
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
                }
            }

            dispatch(initialize('deviceSaveForm', initialValues));
        },
        onResetDevice: (emptyObject) => {
            dispatch(resetDeviceActionCreator(emptyObject));
            dispatch(initialize('deviceSaveForm', emptyObject));
        },
        onResetSubDevices: (emptyObject) => {
            dispatch(resetSubDevicesActionCreator(emptyObject));
        },
        onSpecificationsSet: (categoryId) => {
            dispatch(specificationsSetActionCreator(categoryId));
        },
        onSubDevicesSet: (categoryId) => {
            dispatch(subDevicesSetActionCreator(categoryId));

            let state = window.store.getState();
            let subDevices = state.deviceSavePageState.subDevices;

            if (!isEmptyObject(subDevices)) {
                for (let prop in subDevices) {
                    if (subDevices[prop].parent_id !== null) {
                        setTimeout(() => {
                            dispatch(change('deviceSaveForm', `sub-device-${prop}`, true));
                        }, 0);
                    }
                }
            }
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
                let pattern = new RegExp(/^(specifications_)|(sub-device-)/);

                if (prop.match(pattern)) {
                    delete values[prop];
                }
            }

            let initialValues = {...values};

            props.initialize(initialValues);
        },
    })
)(DeviceSave);

export default DeviceSaveContainer;