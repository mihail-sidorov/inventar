import { connect } from 'react-redux';
import { changePageOnEmployersPagePaginationActionCreator, makeShortEmployersActionCreator } from '../../../redux/employersPageReducer';
import Pagination from '../../DevicesPage/Pagination/Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.employersPageState.pagination.currentPage,
        pages: state.employersPageState.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changePageOnEmployersPagePaginationActionCreator(page));
            dispatch(makeShortEmployersActionCreator());
        },
    };
}

let EmployersPagePaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default EmployersPagePaginationContainer;