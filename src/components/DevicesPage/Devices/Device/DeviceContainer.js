import { connect } from 'react-redux';
import Device from './Device';

let DeviceContainer = (id) => {
    return connect(
        state => ({
            device: state.devicesPageState.shortDevices[id],
            user: state.usersState.users[state.devicesPageState.shortDevices[id].user_id],
            brand: state.brandsState.brands[state.devicesPageState.shortDevices[id].brand_id],
            category: state.categoriesState.categories[state.devicesPageState.shortDevices[id].category_id],
        }),
        dispatch => ({
            onGoToDeviceCard: (props) => {
                props.history.push(`/devices/${props.device.id}`);
            },
        })
    )(Device);
}

export default DeviceContainer;