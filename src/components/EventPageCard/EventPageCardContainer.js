import { connect } from 'react-redux';
import authHOC from '../../HOC/authHOC';
import { eventsGetActionCreator } from '../../redux/eventsReducer';
import EventPageCard from './EventPageCard';

let EventPageCardContainer = connect(
    state => ({
        events: state.eventsState.events,
    }),
    dispatch => ({
        eventsSet: data => {
            dispatch(eventsGetActionCreator(data));
        },
    })
)(EventPageCard);

export default authHOC(EventPageCardContainer);