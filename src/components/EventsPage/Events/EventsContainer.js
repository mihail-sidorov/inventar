import { connect } from 'react-redux';
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
        onMakeShortEvents: () => {
            dispatch(makeShortEventsActionCreator());
        },
    })
)(Events);

export default EventsContainer;