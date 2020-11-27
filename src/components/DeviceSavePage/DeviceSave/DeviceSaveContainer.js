import { connect } from 'react-redux';
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
        },
        onResetDevice: (emptyObject) => {
            dispatch(resetDeviceActionCreator(emptyObject));
        },
        onSpecificationsSet: (categoryId) => {
            dispatch(specificationsSetActionCreator(categoryId));
        },
        onSpecificationsReset: () => {
            let state = window.store.getState();
            let device = state.deviceSavePageState.device;

            for (let prop in device) {
                let pattern = new RegExp(/^specifications_/);

                if (prop.match(pattern)) {
                    delete device[prop];
                }
            }

            state.form.deviceSaveForm.initial = device;
            state.form.deviceSaveForm.values = device;
        },
    })
)(DeviceSave);

export default DeviceSaveContainer;