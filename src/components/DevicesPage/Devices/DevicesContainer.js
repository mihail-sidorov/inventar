import { connect } from 'react-redux';
import { brandsGetActionCreator } from '../../../redux/brandsReducer';
import { devicesGetActionCreator } from '../../../redux/devicesReducer';
import { usersGetActionCreator } from '../../../redux/usersReducer';
import Devices from './Devices';

let DevicesContainer = connect(
    state => ({
        devices: state.devicesState.devices,
    }),
    dispatch => ({
        onDevicesGet: (data) => {
            dispatch(devicesGetActionCreator(data));
        },
        onUsersGet: (data) => {
            dispatch(usersGetActionCreator(data));
        },
        onBrandsGet: (data) => {
            dispatch(brandsGetActionCreator(data));
        },
    })
)(Devices);

export default DevicesContainer;