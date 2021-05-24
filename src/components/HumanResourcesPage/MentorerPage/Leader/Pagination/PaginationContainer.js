import { connect } from 'react-redux';
import { changeLeaderListPaginationActionCreator, makeShortLeaderListActionCreator } from '../../../../../redux/mentorerPageReducer';
import Pagination from '../../../../DevicesPage/Pagination/Pagination';

let mapStateToProps = (state) => {
    return {
        currentPage: state.mentorerPageState.leaderList.pagination.currentPage,
        pages: state.mentorerPageState.leaderList.pagination.pages,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => {
            dispatch(changeLeaderListPaginationActionCreator(page));
            dispatch(makeShortLeaderListActionCreator());
        },
    };
}

let PaginationContainer = connect(mapStateToProps, mapDispatchToProps)(Pagination);

export default PaginationContainer;