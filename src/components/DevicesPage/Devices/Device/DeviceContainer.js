import { connect } from 'react-redux';
import Device from './Device';

let DeviceContainer = (id) => {
    return connect(
        state => ({
            device: state.devicesPageState.shortDevices[id],
            user: state.usersState.users[state.devicesPageState.shortDevices[id].user_id],
            brand: state.brandsState.brands[state.devicesPageState.shortDevices[id].brand_id],
        }),
        dispatch => ({

        })
    )(Device);
}

export default DeviceContainer;