import { connect } from 'react-redux';
import { usersGetActionCreator } from '../../../redux/usersReducer';
import EventPageCardMentoring from './EventPageCardMentoring';

let EventPageCardMentoringContainer = connect(
    state => ({
        events: state.eventsState.events,
        users: state.usersState.users,
    }),
    dispatch => ({
        usersSet: data => {
            dispatch(usersGetActionCreator(data));
        },
    })
)(EventPageCardMentoring);

export default EventPageCardMentoringContainer;