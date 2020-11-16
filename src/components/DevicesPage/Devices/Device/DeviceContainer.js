import { connect } from 'react-redux';
import Device from './Device';

let DeviceContainer = (id) => {
    return connect(
        state => ({
            device: state.devicesPageState.devices[id],
        }),
        dispatch => ({

        })
    )(Device);
}

export default DeviceContainer;