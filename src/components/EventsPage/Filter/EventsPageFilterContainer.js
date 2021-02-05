import { connect } from 'react-redux';
import { changePersonInFilterOnEventsPageActionCreator, changeStatusInFilterOnEventsPageActionCreator, makeShortEventsActionCreator } from '../../../redux/eventsPageReducer';
import EventsPageFilter from './EventsPageFilter';

let EventsPageFilterContainer = connect(
    state => ({
        filter: state.eventsPageState.filter,
    }),
    dispatch => ({
        changeStatus: (status) => {
            dispatch(changeStatusInFilterOnEventsPageActionCreator(status));
            dispatch(makeShortEventsActionCreator());
        },
        changePerson: () => {
            dispatch(changePersonInFilterOnEventsPageActionCreator());
            dispatch(makeShortEventsActionCreator());
        },
    })
)(EventsPageFilter);

export default EventsPageFilterContainer;