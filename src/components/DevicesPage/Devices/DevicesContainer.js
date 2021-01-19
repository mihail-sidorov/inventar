import { connect } from 'react-redux';
import { brandsGetActionCreator } from '../../../redux/brandsReducer';
import { categoriesGetActionCreator } from '../../../redux/categoriesReducer';
import { makeShortDevicesActionCreator } from '../../../redux/devicesPageReducer';
import { devicesGetActionCreator } from '../../../redux/devicesReducer';
import { usersGetActionCreator } from '../../../redux/usersReducer';
import Devices from './Devices';

let DevicesContainer = connect(
    state => ({
        devices: state.devicesPageState.shortDevices,
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
        onCategoriesGet: (data) => {
            dispatch(categoriesGetActionCreator(data));
        },
        onMakeShortDevices: () => {
            dispatch(makeShortDevicesActionCreator());
        },
    })
)(Devices);

export default DevicesContainer;