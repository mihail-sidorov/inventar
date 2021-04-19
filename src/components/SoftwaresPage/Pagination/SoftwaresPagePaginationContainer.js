import { connect } from 'react-redux';
import { changePageOnSoftwaresPagePaginationActionCreator, makeShortSoftwaresActionCreator } from '../../../redux/softwaresPageReducer';
import Pagination from '../../DevicesPage/Pagination/Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.softwaresPageState.pagination.currentPage,
        pages: state.softwaresPageState.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changePageOnSoftwaresPagePaginationActionCreator(page));
            dispatch(makeShortSoftwaresActionCreator());
        },
    };
}

let SoftwaresPagePaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default SoftwaresPagePaginationContainer;