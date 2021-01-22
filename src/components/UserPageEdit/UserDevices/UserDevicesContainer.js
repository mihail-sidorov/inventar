import { connect } from 'react-redux';
import { brandsGetActionCreator } from '../../../redux/brandsReducer';
import { attachDeviceToUserActionCreator, devicesGetActionCreator } from '../../../redux/devicesReducer';
import { unAttachDeviceFromUser, userDevicesUserIdSetActionCreator } from '../../../redux/userDevicesReducer';
import UserDevices from './UserDevices';

let UserDevicesContainer = connect(
    (state) => {
        let userDevices = {};

        if (state.userDevicesState.userId !== null) {
            for (let prop in state.devicesState.devices) {
                if ((state.devicesState.devices[prop].user_id == state.userDevicesState.userId) && (state.devicesState.devices[prop].status === 'given' || state.devicesState.devices[prop].status === 'givenIncomplete' || state.devicesState.devices[prop].status === 'return')) {
                    userDevices[prop] = state.devicesState.devices[prop];
                }
            }
        }

        return {
            userDevices: userDevices,
            brands: state.brandsState.brands,
            userId: state.userDevicesState.userId,
        };
    },
    dispatch => ({
        onDevicesGet: (data) => {
            dispatch(devicesGetActionCreator(data));
        },
        onUserIdSet: (userId) => {
            dispatch(userDevicesUserIdSetActionCreator(userId));
        },
        onBrandsGet: (data) => {
            dispatch(brandsGetActionCreator(data));
        },
        onUnAttachDeviceFromUser: (userId, deviceId) => {
            unAttachDeviceFromUser(userId, deviceId)
                .then((response) => {
                    dispatch(attachDeviceToUserActionCreator(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    })
)(UserDevices);

export default UserDevicesContainer;