import { connect } from 'react-redux';
import { editDevice } from '../../../../redux/deviceSavePageReducer';
import { devicesGetActionCreator, saveDeviceActionCreator } from '../../../../redux/devicesReducer';
import { changeSubDevicesSearchActionCreator, makeSubDevicesActionCreator, makeSubDevicesSearchActionCreator } from '../../../../redux/subDevicesReducer';
import SubDevices from './SubDevices';

let SubDevicesContainer = connect(
    state => ({
        search: state.subDevicesState.search,
        subDevicesSearch: state.subDevicesState.subDevicesSearch,
        subDevices: state.subDevicesState.subDevices,
        brands: state.brandsState.brands,
    }),
    dispatch => ({
        changeSubDevicesSearch: search => {
            dispatch(changeSubDevicesSearchActionCreator(search));
            dispatch(makeSubDevicesSearchActionCreator());
        },
        makeSubDevicesSearch: () => {
            dispatch(makeSubDevicesSearchActionCreator());
        },
        makeSubDevices: () => {
            dispatch(makeSubDevicesActionCreator());
        },
        attachDeviceToDevice: (id, subId) => {
            editDevice({id: subId, parent_id: id})
                .then((response) => {
                    dispatch(saveDeviceActionCreator(response.data));
                    dispatch(makeSubDevicesSearchActionCreator());
                    dispatch(makeSubDevicesActionCreator());
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        unAttachDeviceFromDevice: subId => {
            editDevice({id: subId, parent_id: null})
                .then((response) => {
                    dispatch(saveDeviceActionCreator(response.data));
                    dispatch(makeSubDevicesSearchActionCreator());
                    dispatch(makeSubDevicesActionCreator());
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    })
)(SubDevices);

export default SubDevicesContainer;