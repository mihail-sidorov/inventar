import { connect } from 'react-redux';
import { brandsGetActionCreator } from '../../../redux/brandsReducer';
import { categoriesGetActionCreator } from '../../../redux/categoriesReducer';
import { devicesGetActionCreator } from '../../../redux/devicesReducer';
import { usersGetActionCreator } from '../../../redux/usersReducer';
import EventPageCardGivenReturnDevice from './EventPageCardGivenReturnDevice';

let EventPageCardGivenReturnDeviceContainer = connect(
    state => ({
        events: state.eventsState.events,
        users: state.usersState.users,
        brands: state.brandsState.brands,
        categories: state.categoriesState.categories,
        devices: state.devicesState.devices,
    }),
    dispatch => ({
        usersSet: data => {
            dispatch(usersGetActionCreator(data));
        },
        brandsSet: data => {
            dispatch(brandsGetActionCreator(data));
        },
        categoriesSet: data => {
            dispatch(categoriesGetActionCreator(data));
        },
        devicesSet: data => {
            dispatch(devicesGetActionCreator(data));
        },
    })
)(EventPageCardGivenReturnDevice);

export default EventPageCardGivenReturnDeviceContainer;