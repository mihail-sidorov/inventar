import { connect } from 'react-redux';
import { changeEventsPageSearchActionCreator, makeShortEventsActionCreator } from '../../../redux/eventsPageReducer';
import Search from '../../DevicesPage/Search/Search';

let EventsSearchContainer = connect(
    state => ({
        search: state.eventsPageState.search,
    }),
    dispatch => ({
        onChangeSearch: (value) => {
            dispatch(changeEventsPageSearchActionCreator(value));
            dispatch(makeShortEventsActionCreator());
        },
    })
)(Search);

export default EventsSearchContainer;