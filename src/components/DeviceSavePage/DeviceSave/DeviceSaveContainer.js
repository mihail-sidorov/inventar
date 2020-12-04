import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import isEmptyObject from '../../../functions/isEmptyObject';
import { brandsGetActionCreator } from '../../../redux/brandsReducer';
import { categoriesGetActionCreator } from '../../../redux/categoriesReducer';
import { resetDeviceActionCreator, saveDevice, editDevice, setDeviceInDeviceSavePageActionCreator, specificationsSetActionCreator, subDevicesSetActionCreator, resetSubDevicesActionCreator } from '../../../redux/deviceSavePageReducer';
import { changeWasAddInDevicesPageStateActionCreator } from '../../../redux/devicesPageReducer';
import { saveDeviceActionCreator, devicesGet, devicesGetActionCreator } from '../../../redux/devicesReducer';
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

            if (values.category_id && state.categoriesState.categories[values.category_id]) {
                let category = state.categoriesState.categories[values.category_id];
                let specificationsFields = true;

                values.specifications = {};

                for (let prop in category.schema.properties) {
                    if (!values[`specifications_${prop}`]) {
                        specificationsFields = false;
                        break;
                    }
                    else {
                        values.specifications[prop] = values[`specifications_${prop}`];
                    }
                }

                if (specificationsFields && values.model && values.inv_number && values.price && values.date_purchase && values.date_warranty_end && values.user_id && values.brand_id && values.supplier_id && values.location_id) {
                    let state = window.store.getState();
                    let statuses = state.statusesState.statuses;
                    let statusId = null;

                    for (let prop in statuses) {
                        if (statuses[prop].status === 'stock') {
                            statusId = statuses[prop].id;
                        }
                    }

                    if (values.status_id === undefined && statusId !== null) {
                        values.status_id = String(statusId);
                    }

                    if (props.match.params.device === 'add') {
                        saveDevice(values)
                            .then((device) => {
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
                                console.log(error);
                            });
                    }
                    else {
                        editDevice(values)
                            .then((response) => {
                                dispatch(saveDeviceActionCreator(response.data));
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
        onDevicesGet: (data) => {
            dispatch(devicesGetActionCreator(data));
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