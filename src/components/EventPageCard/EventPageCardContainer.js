import { connect } from 'react-redux';
import authHOC from '../../HOC/authHOC';
import { eventsGetActionCreator } from '../../redux/eventsReducer';
import { usersGetActionCreator } from '../../redux/usersReducer';
import EventPageCard from './EventPageCard';

let EventPageCardContainer = connect(
    state => ({
        events: state.eventsState.events,
        users: state.usersState.users,
    }),
    dispatch => ({
        eventsSet: data => {
            dispatch(eventsGetActionCreator(data));
        },
        usersSet: data => {
            dispatch(usersGetActionCreator(data));
        },
    })
)(EventPageCard);

export default authHOC(EventPageCardContainer);