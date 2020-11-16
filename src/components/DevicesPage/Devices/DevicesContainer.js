import { connect } from 'react-redux';
import { devicesGetActionCreator } from '../../../redux/devicesReducer';
import Devices from './Devices';

let DevicesContainer = connect(
    state => ({
        devices: state.devicesState.devices,
    }),
    dispatch => ({
        onDevicesGet: (data) => {
            dispatch(devicesGetActionCreator(data));
        },
    })
)(Devices);

export default DevicesContainer;