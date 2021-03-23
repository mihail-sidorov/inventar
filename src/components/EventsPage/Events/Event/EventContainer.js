import { connect } from 'react-redux';
import Event from './Event';

let EventContainer = (id) => {
    return connect(
        state => ({
            event: state.eventsPageState.shortEvents[id],
            users: state.usersState.users,
            userId: state.authState.userId,
        }),
        dispatch => ({
            actionEvent: (id, type) => {
                console.log(id, type);
            },
            actionGroup: (ids, type) => {
                console.log(ids, type);
            },
            goToEventCard: (id, history) => {
                history.push(`events/card/${id}`);
            },
        })
    )(Event);
}

export default EventContainer;