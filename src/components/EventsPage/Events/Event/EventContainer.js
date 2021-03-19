import { connect } from 'react-redux';
import Event from './Event';

let EventContainer = (id) => {
    return connect(
        state => ({
            event: state.eventsPageState.shortEvents[id],
            users: state.usersState.users,
            userId: state.authState.userId,
            id: id,
        }),
        dispatch => ({
            actionEvent: (id, type) => {
                console.log(id, type);
            },
            goToEventCard: props => {
                props.history.push(`events/card/${props.id}`);
            },
        })
    )(Event);
}

export default EventContainer;