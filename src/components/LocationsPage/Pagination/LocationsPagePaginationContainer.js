import { connect } from 'react-redux';
import { changePageOnLocationsPagePaginationActionCreator, makeShortLocationsActionCreator } from '../../../redux/locationsPageReducer';
import Pagination from '../../DevicesPage/Pagination/Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.locationsPageState.pagination.currentPage,
        pages: state.locationsPageState.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changePageOnLocationsPagePaginationActionCreator(page));
            dispatch(makeShortLocationsActionCreator());
        },
    };
}

let LocationsPagePaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default LocationsPagePaginationContainer;