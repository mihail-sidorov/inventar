import { connect } from 'react-redux';
import { brandsGetActionCreator } from '../../../redux/brandsReducer';
import { devicesGetActionCreator } from '../../../redux/devicesReducer';
import { userDevicesUserIdSetActionCreator } from '../../../redux/userDevicesReducer';
import UserDevices from './UserDevices';

let UserDevicesContainer = connect(
    (state) => {
        let userDevices = {};

        if (state.userDevicesState.userId !== null) {
            for (let prop in state.devicesState.devices) {
                if (state.devicesState.devices[prop].user_id == state.userDevicesState.userId) {
                    userDevices[prop] = state.devicesState.devices[prop];
                }
            }
        }

        return {
            userDevices: userDevices,
            brands: state.brandsState.brands,
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
    })
)(UserDevices);

export default UserDevicesContainer;