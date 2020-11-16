import { connect } from 'react-redux';
import { devicesGetActionCreator } from '../../../redux/devicesPageReducer';
import Devices from './Devices';

let DevicesContainer = connect(
    state => ({
        devices: state.devicesPageState.devices,
    }),
    dispatch => ({
        onDevicesGet: (data) => {
            dispatch(devicesGetActionCreator(data));
        },
    })
)(Devices);

export default DevicesContainer;