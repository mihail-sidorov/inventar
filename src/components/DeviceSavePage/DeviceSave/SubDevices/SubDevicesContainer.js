import { connect } from 'react-redux';
import { subDevices } from '../../../../redux/deviceSavePageReducer';
import { saveDeviceActionCreator } from '../../../../redux/devicesReducer';
import { eventsGet, eventsGetActionCreator } from '../../../../redux/eventsReducer';
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
            subDevices(Number(id), [Number(subId)])
                .then((response) => {
                    dispatch(saveDeviceActionCreator(response.data[0]));
                    dispatch(makeSubDevicesSearchActionCreator());
                    dispatch(makeSubDevicesActionCreator());
                    return eventsGet();
                })
                .then(res => {
                    dispatch(eventsGetActionCreator(res.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        unAttachDeviceFromDevice: subId => {
            subDevices(null, [Number(subId)])
                .then((response) => {
                    dispatch(saveDeviceActionCreator(response.data[0]));
                    dispatch(makeSubDevicesSearchActionCreator());
                    dispatch(makeSubDevicesActionCreator());
                    return eventsGet();
                })
                .then(res => {
                    dispatch(eventsGetActionCreator(res.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    })
)(SubDevices);

export default SubDevicesContainer;