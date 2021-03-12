import { connect } from 'react-redux';
import { changePageOnDepartmentNamesPagePaginationActionCreator, makeShortDepartmentNamesActionCreator } from '../../../redux/departmentNamesPageReducer';
import Pagination from '../../DevicesPage/Pagination/Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.departmentNamesPageState.pagination.currentPage,
        pages: state.departmentNamesPageState.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changePageOnDepartmentNamesPagePaginationActionCreator(page));
            dispatch(makeShortDepartmentNamesActionCreator());
        },
    };
}

let DepartmentNamesPagePaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default DepartmentNamesPagePaginationContainer;