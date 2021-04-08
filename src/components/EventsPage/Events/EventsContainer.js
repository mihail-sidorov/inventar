import { connect } from 'react-redux';
import { brandsGetActionCreator } from '../../../redux/brandsReducer';
import { categoriesGetActionCreator } from '../../../redux/categoriesReducer';
import { devicesGetActionCreator } from '../../../redux/devicesReducer';
import { makeShortEventsActionCreator } from '../../../redux/eventsPageReducer';
import { eventsGetActionCreator } from '../../../redux/eventsReducer';
import { usersGetActionCreator } from '../../../redux/usersReducer';
import Events from './Events';

let EventsContainer = connect(
    state => ({
        events: state.eventsPageState.shortEvents,
    }),
    dispatch => ({
        onEventsGet: (data) => {
            dispatch(eventsGetActionCreator(data));
        },
        onUsersGet: (data) => {
            dispatch(usersGetActionCreator(data));
        },
        onDevicesGet: (data) => {
            dispatch(devicesGetActionCreator(data));
        },
        onBrandsGet: (data) => {
            dispatch(brandsGetActionCreator(data));
        },
        onCategoriesGet: (data) => {
            dispatch(categoriesGetActionCreator(data));
        },
        onMakeShortEvents: () => {
            dispatch(makeShortEventsActionCreator());
        },
    })
)(Events);

export default EventsContainer;