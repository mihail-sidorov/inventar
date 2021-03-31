import { connect } from 'react-redux';
import { brandsGetActionCreator } from '../../../../redux/brandsReducer';
import { categoriesGetActionCreator } from '../../../../redux/categoriesReducer';
import { devicesGetActionCreator } from '../../../../redux/devicesReducer';
import { userDevicesSetActionCreator } from '../../../../redux/devicesPageUserReducer';
import DevicesPageUser from './DevicesPageUser';

let DevicesPageUserContainer = connect(
    state => ({
        brands: state.brandsState.brands,
        categories: state.categoriesState.categories,
        userId: state.authState.userId,
        userDevices: state.devicesPageUserState.userDevices,
    }),
    dispatch => ({
        onDevicesGet: data => {
            dispatch(devicesGetActionCreator(data));
        },
        onBrandsGet: data => {
            dispatch(brandsGetActionCreator(data));
        },
        onCategoriesGet: data => {
            dispatch(categoriesGetActionCreator(data));
        },
        onUserDevicesSet: userId => {
            dispatch(userDevicesSetActionCreator(userId));
        },
    })
)(DevicesPageUser);

export default DevicesPageUserContainer;