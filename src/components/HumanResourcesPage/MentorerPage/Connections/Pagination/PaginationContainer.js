import { connect } from 'react-redux';
import { changeHrListPaginationActionCreator, makeShortHrListActionCreator } from '../../../../../redux/mentorerPageReducer';
import Pagination from '../../../../DevicesPage/Pagination/Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.mentorerPageState.hrList.pagination.currentPage,
        pages: state.mentorerPageState.hrList.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changeHrListPaginationActionCreator(page));
            dispatch(makeShortHrListActionCreator());
        },
    };
}

let PaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default PaginationContainer;