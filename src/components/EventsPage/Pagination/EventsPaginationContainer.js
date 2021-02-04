import { connect } from 'react-redux';
import { changePageOnEventsPagePaginationActionCreator, makeShortEventsActionCreator } from '../../../redux/eventsPageReducer';
import Pagination from '../../DevicesPage/Pagination/Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.eventsPageState.pagination.currentPage,
        pages: state.eventsPageState.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changePageOnEventsPagePaginationActionCreator(page));
            dispatch(makeShortEventsActionCreator());
        },
    };
}

let EventsPaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default EventsPaginationContainer;