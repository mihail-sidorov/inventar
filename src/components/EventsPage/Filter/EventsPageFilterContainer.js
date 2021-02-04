import { connect } from 'react-redux';
import { changePersonInFilterOnEventsPageActionCreator, changeStatusInFilterOnEventsPageActionCreator } from '../../../redux/eventsPageReducer';
import EventsPageFilter from './EventsPageFilter';

let EventsPageFilterContainer = connect(
    state => ({
        filter: state.eventsPageState.filter,
    }),
    dispatch => ({
        changeStatus: (status) => {
            dispatch(changeStatusInFilterOnEventsPageActionCreator(status));
        },
        changePerson: () => {
            dispatch(changePersonInFilterOnEventsPageActionCreator());
        },
    })
)(EventsPageFilter);

export default EventsPageFilterContainer;