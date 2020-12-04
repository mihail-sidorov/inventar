import { connect } from 'react-redux';
import SubDevices from './SubDevices';

let SubDevicesContainer = connect(
    state => ({
        subDevices: state.deviceSavePageState.subDevices,
        brands: state.brandsState.brands,
    }),
    dispatch => ({
        
    })
)(SubDevices);

export default SubDevicesContainer;