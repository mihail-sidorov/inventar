import { connect } from 'react-redux';
import Event from './Event';

let EventContainer = (id) => {
    return connect(
        state => ({
            event: state.eventsPageState.shortEvents[id],
            users: state.usersState.users,
        }),
        dispatch => ({

        })
    )(Event);
}

export default EventContainer;