import { connect } from 'react-redux';
import { changePageOnDepartmentsLocationsPagePaginationActionCreator, makeShortDepartmentsLocationsActionCreator } from '../../../redux/departmentsLocationsPageReducer';
import Pagination from '../../DevicesPage/Pagination/Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.departmentsLocationsPageState.pagination.currentPage,
        pages: state.departmentsLocationsPageState.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changePageOnDepartmentsLocationsPagePaginationActionCreator(page));
            dispatch(makeShortDepartmentsLocationsActionCreator());
        },
    };
}

let DepartmentsLocationsPagePaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default DepartmentsLocationsPagePaginationContainer;