import { connect } from 'react-redux';
import { changePageOnPostsDepartmentsLocationsPagePaginationActionCreator, makeShortPostsDepartmentsLocationsActionCreator } from '../../../redux/postsDepartmentsLocationsPageReducer';
import Pagination from '../../DevicesPage/Pagination/Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.postsDepartmentsLocationsPageState.pagination.currentPage,
        pages: state.postsDepartmentsLocationsPageState.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changePageOnPostsDepartmentsLocationsPagePaginationActionCreator(page));
            dispatch(makeShortPostsDepartmentsLocationsActionCreator());
        },
    };
}

let PostsDepartmentsLocationsPagePaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default PostsDepartmentsLocationsPagePaginationContainer;